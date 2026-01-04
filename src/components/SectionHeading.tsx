import React from "react";

export default function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: React.ReactNode;
}) {
  return (
    <div className="mb-8 sm:mb-10">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>

      {subtitle ? (
        <div className="mt-3 text-sm sm:text-base text-[rgb(var(--muted))] leading-relaxed">
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}
