import React from "react";

export default function SectionHeading({
  title,
  subtitle,
  className,
  subtitleClassName,
}: {
  title: string;
  subtitle?: React.ReactNode;
  className?: string;
  subtitleClassName?: string;
}) {
  return (
    <div className={`mb-8 sm:mb-10 ${className ?? ""}`}>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>

      {subtitle ? (
        <div
          className={`mt-3 text-sm sm:text-base text-[rgb(var(--muted))] leading-relaxed ${
            subtitleClassName ?? ""
          }`}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}
