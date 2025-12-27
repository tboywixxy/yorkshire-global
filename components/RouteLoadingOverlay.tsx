// components/RouteLoadingOverlay.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

function LogoSpinnerLoader() {
  return (
    <div className="relative grid place-items-center">
      {/* spinner ring */}
      <motion.div
        className="absolute h-24 w-24 rounded-full border-2 border-white/15 border-t-white/85"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />

      {/* center logo (slightly bigger) */}
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
          {/* Backdrop only (no card/background behind loader) */}
          <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />

          {/* Loader only */}
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
