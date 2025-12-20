// components/RouteLoadingOverlay.tsx
"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Sleek lock: thin strokes, subtle shimmer, keyhole pulse, micro-float
 * (No icon pack needed)
 */
function SleekLockLoader() {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="relative grid place-items-center"
        initial={{ opacity: 0, scale: 0.98, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.99, y: 4 }}
        transition={{ duration: 0.22 }}
      >
        {/* glass ring */}
        <motion.div
          className="relative h-16 w-16 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-[0_18px_70px_rgba(0,0,0,0.45)]"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* shimmer sweep */}
          <motion.div
            className="absolute inset-0 overflow-hidden rounded-2xl"
            aria-hidden="true"
          >
            <motion.div
              className="absolute -left-10 top-0 h-full w-10 bg-white/15 blur-[1px]"
              animate={{ x: [-40, 120] }}
              transition={{
                duration: 1.25,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 0.35,
              }}
              style={{ transform: "skewX(-18deg)" }}
            />
          </motion.div>

          {/* lock svg */}
          <div className="absolute inset-0 grid place-items-center">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              className="opacity-95"
              aria-hidden="true"
            >
              {/* shackle */}
              <path
                d="M7.5 10V7.8a4.5 4.5 0 0 1 9 0V10"
                stroke="rgba(255,255,255,0.92)"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              {/* body */}
              <path
                d="M7.2 10h9.6c.9 0 1.7.8 1.7 1.7v6.6c0 .9-.8 1.7-1.7 1.7H7.2c-.9 0-1.7-.8-1.7-1.7v-6.6c0-.9.8-1.7 1.7-1.7Z"
                stroke="rgba(255,255,255,0.92)"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
              {/* keyhole */}
              <motion.circle
                cx="12"
                cy="14.3"
                r="1.25"
                fill="rgba(255,255,255,0.92)"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.05, repeat: Infinity, ease: "easeInOut" }}
              />
              <path
                d="M12 15.6v2"
                stroke="rgba(255,255,255,0.92)"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </motion.div>

        {/* subtle glow */}
        <motion.div
          className="absolute -bottom-3 h-6 w-24 rounded-full bg-white/10 blur-xl"
          animate={{ opacity: [0.25, 0.45, 0.25], scale: [0.95, 1, 0.95] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <p className="mt-3 text-sm text-white/85">Securing your request…</p>
      <p className="mt-1 text-xs text-white/55">Loading</p>
    </div>
  );
}

export default function RouteLoadingOverlay() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const t = window.setTimeout(() => setShow(false), 900); // min duration
    return () => window.clearTimeout(t);
  }, [pathname]);

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
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />

          {/* Content */}
          <motion.div
            className="relative z-10 rounded-3xl border border-white/10 bg-white/5 px-9 py-7 shadow-[0_22px_80px_rgba(0,0,0,0.55)]"
            initial={{ y: 10, opacity: 0, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 6, opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.22 }}
          >
            <SleekLockLoader />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
