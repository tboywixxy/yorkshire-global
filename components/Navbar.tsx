// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
  const clean = p.split("?")[0].split("#")[0];
  if (clean !== "/" && clean.endsWith("/")) return clean.slice(0, -1);
  return clean;
}

function isActive(pathname: string, href: string) {
  const path = normalizePath(pathname);
  const target = normalizePath(href);

  if (target === "/") return path === "/";
  return path === target || path.startsWith(`${target}/`);
}

type PillState = { x: number; w: number; ready: boolean };

function HamburgerIcon({ open }: { open: boolean }) {
  // three lines that morph into an X
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

export default function Navbar() {
  const nextPathname = usePathname();
  const [open, setOpen] = useState(false);

  // stable client pathname
  const [clientPath, setClientPath] = useState<string>(() => {
    if (typeof window === "undefined") return "/";
    return normalizePath(window.location.pathname);
  });

  useEffect(() => {
    if (nextPathname) setClientPath(normalizePath(nextPathname));
  }, [nextPathname]);

  // faint bluish background after scroll
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeItem = useMemo(() => {
    const found = navItems.find((i) => isActive(clientPath, i.href));
    return found ?? navItems[0];
  }, [clientPath]);

  const activeLabel = activeItem.label;

  // sliding pill (desktop)
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [pill, setPill] = useState<PillState>({ x: 0, w: 0, ready: false });

  const measure = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const node = itemRefs.current[activeItem.href];
    if (!node) return;

    const wrapRect = wrap.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();

    setPill({
      x: nodeRect.left - wrapRect.left,
      w: nodeRect.width,
      ready: true,
    });
  };

  useLayoutEffect(() => {
    const raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItem.href]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    const raf2 = requestAnimationFrame(measure);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => measure());
      if (wrapRef.current) ro.observe(wrapRef.current);

      navItems.forEach((i) => {
        const n = itemRefs.current[i.href];
        if (n) ro!.observe(n);
      });
    }

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf2);
      ro?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Mobile close behaviors ----
  const mobileMenuWrapRef = useRef<HTMLDivElement | null>(null);
  const mobileButtonRef = useRef<HTMLButtonElement | null>(null);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      const menu = mobileMenuWrapRef.current;
      const btn = mobileButtonRef.current;
      const target = e.target as Node;

      // if click is outside both the menu and the button -> close
      if (menu && !menu.contains(target) && btn && !btn.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Close when scrolling while open
  useEffect(() => {
    if (!open) return;

    let ticking = false;
    const onScrollClose = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setOpen(false);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScrollClose, { passive: true });
    return () => window.removeEventListener("scroll", onScrollClose);
  }, [open]);

  // Close on route change
  useEffect(() => {
    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientPath]);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-200",
        scrolled
          ? ["bg-sky-950/35", "backdrop-blur", "border-b border-white/10"].join(" ")
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl container-pad">
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 font-semibold tracking-tight"
            onClick={() => setOpen(false)}
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black text-[11px]">
              YG
            </span>
            <span className="hidden sm:inline text-sm text-white">
              Yorkshire Global Consulting Inc.
            </span>
            <span className="sm:hidden text-sm text-white">Yorkshire Global</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            <div
              ref={wrapRef}
              className="relative flex items-center gap-1 rounded-xl py-0.5 px-0.5"
            >
              {pill.ready ? (
                <motion.span
                  className={[
                    "absolute left-0 top-1/2 -translate-y-1/2",
                    "h-7 rounded-md bg-white",
                  ].join(" ")}
                  initial={false}
                  animate={{ x: pill.x, width: pill.w }}
                  transition={{ type: "spring", stiffness: 520, damping: 38, mass: 0.6 }}
                />
              ) : null}

              {navItems.map((item) => {
                const active = isActive(clientPath, item.href);

                return (
                  <div
                    key={item.href}
                    ref={(el) => {
                      itemRefs.current[item.href] = el;
                    }}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className={[
                        "relative z-10 rounded-md px-2.5 py-1 text-xs transition",
                        active ? "text-black" : "text-white/90 hover:bg-white/10",
                      ].join(" ")}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Desktop theme toggle */}
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />

            {/* ✅ icon-only hamburger button */}
            <button
              ref={mobileButtonRef}
              className={[
                "inline-flex items-center justify-center rounded-lg",
                "border border-white/20 bg-white/10",
                "h-9 w-10 shadow-sm transition hover:opacity-90",
              ].join(" ")}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <HamburgerIcon open={open} />
            </button>
          </div>
        </div>

{/* Mobile menu (smooth carpet roll — background + items stay locked together) */}
<AnimatePresence>
  {open ? (
    <div className="md:hidden pb-3">
      <motion.div
        key="mobileMenuPanel"
        ref={mobileMenuWrapRef}
        className={[
          "relative rounded-2xl border border-white/10 shadow-sm overflow-hidden",
          // IMPORTANT: no backdrop-blur on the animated element (causes lag)
          "will-change-transform",
        ].join(" ")}
        initial={{
          opacity: 0,
          y: -8,
          clipPath: "inset(0 0 100% 0 round 16px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0 round 16px)",
        }}
        exit={{
          opacity: 0,
          y: -8,
          clipPath: "inset(0 0 100% 0 round 16px)",
        }}
        transition={{
          duration: 0.34,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {/* Background layer (moves/clips WITH the content) */}
        <div className="absolute inset-0 bg-sky-950/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-70" />

        {/* Content */}
        <div className="relative p-2">
          <div className="px-3 pb-2 pt-1 text-[11px] text-white/70">
            You are on:{" "}
            <span className="font-medium text-white">{activeLabel}</span>
          </div>

          <div className="flex flex-col">
            {navItems.map((item) => {
              const active = isActive(clientPath, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={[
                    "rounded-xl px-3 py-2 text-xs transition",
                    active ? "bg-white text-black" : "text-white/90 hover:bg-white/10",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  ) : null}
</AnimatePresence>


      </div>
    </header>
  );
}
