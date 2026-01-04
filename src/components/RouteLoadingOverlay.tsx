"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

function LogoSpinnerLoader() {
  return (
    <div className="relative grid place-items-center">
      <motion.div
        className="absolute h-24 w-24 rounded-full border-2 border-white/15 border-t-white/85"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />

      <div className="relative h-14 w-14">
        <Image
          src="/loag-img.png"
          alt="Loading"
          fill
          priority
          className="object-contain"
          sizes="56px"
        />
      </div>
    </div>
  );
}

export default function RouteLoadingOverlay() {
  const pathname = usePathname();

  // Tunables
  const SHOW_AFTER_MS = 350; // show only if navigation is slow
  const MIN_VISIBLE_MS = 250; // once shown, keep visible briefly (avoid flicker)

  const [show, setShow] = useState(false);

  const showTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  const navInFlightRef = useRef(false);
  const shownAtRef = useRef(0);
  const pendingUrlRef = useRef<string | null>(null);

  const clearTimers = () => {
    if (showTimerRef.current) window.clearTimeout(showTimerRef.current);
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    showTimerRef.current = null;
    hideTimerRef.current = null;
  };

  const startNav = (url: string) => {
    // If we click the same page, don't do anything
    if (url === pathname) return;

    // Reset any previous nav
    clearTimers();

    navInFlightRef.current = true;
    pendingUrlRef.current = url;

    // Only show if it takes "long enough"
    showTimerRef.current = window.setTimeout(() => {
      if (!navInFlightRef.current) return;
      shownAtRef.current = Date.now();
      setShow(true);
    }, SHOW_AFTER_MS);
  };

  const endNav = () => {
    if (!navInFlightRef.current) return;

    navInFlightRef.current = false;
    pendingUrlRef.current = null;

    // Cancel the pending show
    if (showTimerRef.current) window.clearTimeout(showTimerRef.current);
    showTimerRef.current = null;

    // If overlay is visible, respect min visible duration then hide
    if (show) {
      const elapsed = Date.now() - shownAtRef.current;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);

      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = window.setTimeout(() => {
        setShow(false);
      }, remaining);
    } else {
      setShow(false);
    }
  };

  // 1) Detect navigation START by listening to internal link clicks
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // only left-click
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!a) return;

      const href = a.getAttribute("href");
      if (!href) return;

      // ignore new tab/window/download/anchors/external
      if (a.target && a.target !== "_self") return;
      if (a.hasAttribute("download")) return;
      if (href.startsWith("#")) return;

      // Only handle internal navigation
      // Handles absolute same-origin links too
      const url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) return;

      startNav(url.pathname);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // 2) Detect navigation END when pathname changes (new route committed)
  useEffect(() => {
    endNav();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // 3) Safety: if user hits back/forward (popstate), treat as nav start
  useEffect(() => {
    const onPopState = () => {
      startNav(window.location.pathname);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // 4) Cleanup timers on unmount
  useEffect(() => {
    return () => clearTimers();
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          aria-label="Page loading"
          role="status"
        >
          <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />

          <motion.div
            className="relative z-10"
            initial={{ y: 10, opacity: 0, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 6, opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.22 }}
          >
            <LogoSpinnerLoader />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
