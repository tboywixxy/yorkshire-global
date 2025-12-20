"use client";

import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import React, { useMemo, useState } from "react";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  organization: string; // Company Name (optional)
  service: string;
  message: string;
};

function CanadaFlagIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 640 320" aria-hidden="true" focusable="false">
      <rect width="640" height="320" fill="#ffffff" />
      <rect x="0" y="0" width="160" height="320" fill="#d80621" />
      <rect x="480" y="0" width="160" height="320" fill="#d80621" />
      <path
        fill="#d80621"
        d="M320 70
           l-18 52 38-10 -10 38 42-12 -28 52 16 10 -38 0
           0 60 -22 0 0-60 -38 0 16-10 -28-52 42 12 -10-38 38 10 z"
      />
    </svg>
  );
}

export default function ContactPage() {
  const serviceOptions = useMemo(
    () => [
      "Secure Software Development Lifecycle (SSDLc)",
      "Cybersecurity Services",
      "Business Analysis",
      "Project Management",
      "Business & Strategy Consulting",
      "Other / Not sure",
    ],
    []
  );

  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    service: serviceOptions[0],
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);

    setForm({
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      service: serviceOptions[0],
      message: "",
    });

    window.setTimeout(() => setSubmitted(false), 4500);
  }

  const LocationPill = () => (
    <div className="inline-flex items-center gap-2 border border-white/15 bg-white/10 px-3 py-2 text-xs text-white">
      <CanadaFlagIcon className="h-4 w-6" />
      <span>Ontario, Canada</span>
    </div>
  );

  return (
    <section className="relative overflow-hidden -mt-14 pt-[6.75rem] pb-12 sm:pt-[7.75rem] sm:pb-14 text-white">
      {/* ✅ Background image starts from the very top (behind navbar) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2400&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/55" />
      </div>

      <Container>
        <SectionHeading
          title="Get in Touch"
          subtitle="We are based in Ontario, Canada and work with clients across multiple industries. For general inquiries or consultations, please complete the form below."
        />

        <div className="mt-8 grid gap-7 lg:grid-cols-2">
          {/* LEFT: Contact Form (slightly reduced size) */}
          <div className="border border-white/10 bg-white/10 backdrop-blur-xl p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
                  Contact Form
                </h3>
                <p className="mt-1 text-sm text-white/85">
                  Tell us how we can support your business. Our team will respond within{" "}
                  <span className="font-semibold text-white">24 hours</span>.
                </p>
              </div>

              <div className="hidden sm:block">
                <LocationPill />
              </div>
            </div>

            {submitted ? (
              <div className="mt-5 border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-white">
                ✅ Thanks! Your message has been submitted. We’ll get back to you shortly.
              </div>
            ) : null}

            <form onSubmit={onSubmit} className="mt-5 space-y-3.5">
              <div className="grid gap-3.5 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-white">Full Name</label>
                  <input
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    required
                    className="mt-2 w-full border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-white/40 focus:bg-white/15"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white">Email Address</label>
                  <input
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    required
                    type="email"
                    className="mt-2 w-full border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-white/40 focus:bg-white/15"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-white">
                    Phone Number <span className="text-white/70">(optional)</span>
                  </label>
                  <input
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="mt-2 w-full border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-white/40 focus:bg-white/15"
                    placeholder="+1 ..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white">
                    Company Name <span className="text-white/70">(optional)</span>
                  </label>
                  <input
                    value={form.organization}
                    onChange={(e) => update("organization", e.target.value)}
                    className="mt-2 w-full border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-white/40 focus:bg-white/15"
                    placeholder="Company / Organization"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white">Service Needed</label>
                <select
                  value={form.service}
                  onChange={(e) => update("service", e.target.value)}
                  className="mt-2 w-full border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-white/40 focus:bg-white/15"
                >
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt} className="text-slate-900">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-white">
                  Message / Project Description
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  required
                  rows={6}
                  className="mt-2 w-full resize-none border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-white/40 focus:bg-white/15"
                  placeholder="Tell us how we can support your business. Our team will respond within 24 hours."
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:opacity-95 sm:w-auto"
                >
                  Submit
                </button>

                <p className="text-xs text-white/75">
                  By submitting, you agree to be contacted about your inquiry.
                </p>
              </div>

              <div className="sm:hidden pt-1">
                <LocationPill />
              </div>
            </form>
          </div>

          {/* RIGHT: What happens next */}
          <div className="border border-white/10 bg-white/10 backdrop-blur-xl p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
                  What happens next?
                </h3>
                <p className="mt-2 text-sm text-white/85">
                  Clear steps, fast response, and structured delivery.
                </p>
              </div>

              <div className="hidden sm:block">
                <LocationPill />
              </div>
            </div>

            <div className="mt-5 space-y-3.5">
              {[
                "We review your request and clarify goals, constraints, and timeline.",
                "We propose a structured approach and the best starting point.",
                "We align on deliverables, then execute with precision and accountability.",
              ].map((text, i) => (
                <div
                  key={text}
                  className="flex gap-4 border border-white/10 bg-white/10 p-4 transition hover:bg-white/15"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/15 bg-white/10 text-xs font-semibold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-sm text-white/85">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 border border-white/10 bg-white/10 p-5">
              <p className="text-sm font-semibold text-white">Location</p>
              <p className="mt-2 text-sm text-white/85 inline-flex items-center gap-2">
                <CanadaFlagIcon className="h-4 w-6" />
                Ontario, Canada
              </p>
              <p className="mt-4 text-sm text-white/85">
                We work remotely with clients across multiple industries.
              </p>
            </div>

            <div className="sm:hidden mt-6">
              <LocationPill />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
