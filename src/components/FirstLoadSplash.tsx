// src/components/FirstLoadSplash.tsx
"use client";

import React, { useEffect, useState } from "react";

export default function FirstLoadSplash() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only once per tab session. Navigation won't re-trigger it.
    const KEY = "ygc_first_load_done";

    const alreadyDone = sessionStorage.getItem(KEY) === "1";
    if (alreadyDone) return;

    setShow(true);
    sessionStorage.setItem(KEY, "1");

    // Optional: keep visible briefly so it feels intentional
    const t = window.setTimeout(() => setShow(false), 200);
    return () => window.clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-white text-black dark:bg-zinc-950 dark:text-white">
      <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-8 py-7 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-black/20 border-t-black dark:border-white/20 dark:border-t-white" />
          <p className="mt-3 text-sm text-[rgb(var(--muted))]">
            Securing your request…
          </p>
        </div>
      </div>
    </div>
  );
}
