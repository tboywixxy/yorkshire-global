// app/loading.tsx  (optional but recommended: shows while a route is truly loading)
import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-8 py-7 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="relative h-16 w-16 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))]" />
          <p className="mt-3 text-sm text-[rgb(var(--muted))]">
            Securing your request…
          </p>
        </div>
      </div>
    </div>
  );
}
