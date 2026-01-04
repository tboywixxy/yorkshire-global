// src/components/SectionDivider.tsx
import React from "react";

export default function SectionDivider({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none w-full overflow-hidden leading-[0] ${className}`}
      aria-hidden="true"
    >
      <svg
        className="block h-full w-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        {/* ✅ Former style but calmer + filled under curve */}
        <path
          d="
            M0,120
            V88
            C120,104 240,110 360,102
            C480,94 600,72 720,70
            C840,68 960,86 1080,98
            C1140,104 1170,107 1200,108
            V120 Z
          "
          fill="rgb(var(--background))"
        />
      </svg>
    </div>
  );
}
