// app/contact/ContactPage.tsx
"use client";

import Container from "@/src/components/Container";
import SectionHeading from "@/src/components/SectionHeading";
import React, { useMemo, useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  service: string;
  message: string;

  // anti-bot honeypot (should stay empty)
  companyWebsite: string;
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

const LIMITS = {
  fullNameMax: 80,
  emailMax: 120,
  phoneMax: 24,
  orgMax: 60,
  messageWordsMax: 200,
  messageCharsSoftMax: 1400,
};

const MIN_SECONDS_BEFORE_SUBMIT = 3;

function countWords(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

function looksLikeEmail(value: string) {
  const v = value.trim();
  if (!v) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

/* ----------------------------- UI: Toast/Popup ---------------------------- */

type PopupState =
  | { open: false }
  | { open: true; type: "success" | "error"; title: string; message: string };

function Popup({ state, onClose }: { state: PopupState; onClose: () => void }) {
  if (!state.open) return null;

  const isSuccess = state.type === "success";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* backdrop */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute inset-0 bg-black/60"
      />

      {/* card */}
      <div className="relative w-full max-w-md border border-white/15 bg-slate-950/80 backdrop-blur-xl p-5 shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
        <div className="flex items-start gap-3">
          <div
            className={[
              "flex h-10 w-10 shrink-0 items-center justify-center border text-sm font-semibold",
              isSuccess
                ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                : "border-red-400/30 bg-red-400/10 text-red-200",
            ].join(" ")}
            aria-hidden
          >
            {isSuccess ? "✓" : "!"}
          </div>

          <div className="min-w-0">
            <p className="text-base font-semibold text-white">{state.title}</p>
            <p className="mt-1 text-sm text-white/80">{state.message}</p>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

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

  const startedAtRef = useRef<number>(typeof window !== "undefined" ? Date.now() : 0);

  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    service: serviceOptions[0],
    message: "",
    companyWebsite: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [popup, setPopup] = useState<PopupState>({ open: false });

  // ✅ CAPTCHA token
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const turnstileRef = useRef<HTMLDivElement>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => {
      const next = { ...p };
      delete next[key as string];
      delete next.form;
      return next;
    });
  }

  function sanitizePhone(value: string) {
    // allow digits, spaces, parentheses, hyphen, and ONE leading +
    let v = value.replace(/[^\d+\s()-]/g, ""); // removes letters and other symbols
    // keep only one '+' and only at the start
    v = v.replace(/\+/g, (m, offset) => (offset === 0 ? "+" : ""));
    return v;
  }

  function looksLikePhone(value: string) {
    // must contain only allowed chars AND at least 7 digits
    if (!/^\+?[\d\s()-]+$/.test(value.trim())) return false;
    const digits = value.replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
  }

  const messageWordCount = countWords(form.message);
  const messageTooLong =
    messageWordCount > LIMITS.messageWordsMax || form.message.length > LIMITS.messageCharsSoftMax;

  const allRequiredFilled =
    form.fullName.trim().length > 0 &&
    form.email.trim().length > 0 &&
    form.phone.trim().length > 0 &&
    form.organization.trim().length > 0 &&
    form.service.trim().length > 0 &&
    form.message.trim().length > 0;

  const canSubmit = allRequiredFilled && !messageTooLong && !submitting;

  function validate() {
    const next: Record<string, string> = {};

    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    else if (form.fullName.trim().length > LIMITS.fullNameMax)
      next.fullName = `Keep your name under ${LIMITS.fullNameMax} characters.`;

    if (!form.email.trim()) next.email = "Email is required.";
    else if (form.email.trim().length > LIMITS.emailMax)
      next.email = `Keep your email under ${LIMITS.emailMax} characters.`;
    else if (!looksLikeEmail(form.email)) next.email = "Please enter a valid email address.";

    if (!form.phone.trim()) next.phone = "Phone number is required.";
    else if (form.phone.trim().length > LIMITS.phoneMax)
      next.phone = `Keep your phone under ${LIMITS.phoneMax} characters.`;
    else if (!looksLikePhone(form.phone))
      next.phone = "Phone must contain only numbers (and optional + country code).";

    if (!form.organization.trim()) next.organization = "Company name is required.";
    else if (form.organization.trim().length > LIMITS.orgMax)
      next.organization = `Keep company name under ${LIMITS.orgMax} characters.`;

    if (!form.service.trim()) next.service = "Please choose a service.";

    if (!form.message.trim()) next.message = "Message is required.";
    else if (messageWordCount > LIMITS.messageWordsMax)
      next.message = `Please keep your message to ${LIMITS.messageWordsMax} words or fewer.`;
    else if (form.message.length > LIMITS.messageCharsSoftMax)
      next.message = `Please keep your message under ${LIMITS.messageCharsSoftMax} characters.`;

    // honeypot
    if (form.companyWebsite.trim()) next.form = "Submission blocked.";

    // speed gate
    const elapsedMs = Date.now() - startedAtRef.current;
    if (elapsedMs < MIN_SECONDS_BEFORE_SUBMIT * 1000) {
      next.form = "Submission blocked.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function resetForm() {
    startedAtRef.current = Date.now();
    setForm({
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      service: serviceOptions[0],
      message: "",
      companyWebsite: "",
    });

    // ✅ reset captcha token too
    setTurnstileToken("");
    
    // ✅ reset Turnstile widget so user must verify again
    if (typeof window !== "undefined" && window.turnstile) {
      window.turnstile.reset();
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // ✅ captcha required
    if (!turnstileToken) {
      setPopup({
        open: true,
        type: "error",
        title: "Verification needed",
        message: "Please complete the verification and try again.",
      });
      return;
    }

    // quick honeypot
    if (form.companyWebsite.trim()) {
      setErrors({ form: "Submission blocked." });
      setPopup({
        open: true,
        type: "error",
        title: "Submission blocked",
        message: "Please try again.",
      });
      return;
    }

    if (!looksLikeEmail(form.email)) {
      setErrors((p) => ({ ...p, email: "Please enter a valid email address." }));
      setPopup({
        open: true,
        type: "error",
        title: "Invalid email",
        message: "Please check your email address and try again.",
      });
      return;
    }

    if (!validate()) {
      setPopup({
        open: true,
        type: "error",
        title: "Please fix the form",
        message: "Some fields need your attention before you can submit.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          organization: form.organization,
          service: form.service,
          message: form.message,
          companyWebsite: form.companyWebsite,
          startedAt: startedAtRef.current,
          turnstileToken, // ✅ send captcha token to backend
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrors({ form: data?.error ?? "Failed to submit. Please try again." });
        setPopup({
          open: true,
          type: "error",
          title: "Submission failed",
          message: data?.error ?? "We couldn’t send your message. Please try again shortly.",
        });
        return;
      }

      setPopup({
        open: true,
        type: "success",
        title: "Message sent",
        message: "Thanks! We received your message and will reply within 24 hours.",
      });

      resetForm();
    } catch {
      setErrors({ form: "Failed to submit. Please try again." });
      setPopup({
        open: true,
        type: "error",
        title: "Submission failed",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const LocationPill = () => (
    <div className="inline-flex items-center gap-2 border border-white/15 bg-white/10 px-3 py-2 text-xs text-white">
      <CanadaFlagIcon className="h-4 w-6" />
      <span>Ontario, Canada</span>
    </div>
  );

  return (
    <>
      <Popup state={popup} onClose={() => setPopup({ open: false })} />

      <section className="relative overflow-hidden -mt-14 pt-[6.75rem] pb-12 sm:pt-[7.75rem] sm:pb-14 text-white">
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
          <h1 className="sr-only">Contact Yorkshire Global Consulting Inc.</h1>

          <SectionHeading
            title="Get in Touch"
            subtitle="We are based in Ontario, Canada and work with clients across multiple industries. For general inquiries or consultations, please complete the form below."
          />

          <div className="mt-8 grid gap-7 lg:grid-cols-2">
            <div className="border border-white/10 bg-white/10 backdrop-blur-xl p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold tracking-tight text-white sm:text-lg">
                    Contact Form
                  </h2>
                  <p className="mt-1 text-sm text-white/85">
                    Tell us how we can support your business. Our team will respond within{" "}
                    <span className="font-semibold text-white">24 hours</span>.
                  </p>
                </div>

                <div className="hidden sm:block">
                  <LocationPill />
                </div>
              </div>

              {errors.form ? (
                <div className="mt-5 border border-red-400/30 bg-red-400/10 p-4 text-sm text-white">
                  ⚠️ {errors.form}
                </div>
              ) : null}

              <form onSubmit={onSubmit} className="mt-5 space-y-3.5" aria-label="Contact form">
                {/* honeypot */}
                <div
                  aria-hidden="true"
                  className="absolute left-[-10000px] top-auto h-[1px] w-[1px] overflow-hidden"
                >
                  <label className="text-sm font-medium text-white">Company Website</label>
                  <input
                    value={form.companyWebsite}
                    onChange={(e) => update("companyWebsite", e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-white">Full Name</label>
                    <input
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value.slice(0, LIMITS.fullNameMax))}
                      required
                      maxLength={LIMITS.fullNameMax}
                      aria-invalid={!!errors.fullName}
                      className="mt-2 w-full border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-white/40 focus:bg-white/15"
                      placeholder="Your name"
                      autoComplete="name"
                    />
                    <div className="mt-1 flex items-center justify-between text-xs text-white/65">
                      <span className="text-red-200">{errors.fullName ?? ""}</span>
                      <span>
                        {form.fullName.length}/{LIMITS.fullNameMax}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white">Email Address</label>
                    <input
                      value={form.email}
                      onChange={(e) => update("email", e.target.value.slice(0, LIMITS.emailMax))}
                      required
                      type="email"
                      inputMode="email"
                      maxLength={LIMITS.emailMax}
                      aria-invalid={!!errors.email}
                      className="mt-2 w-full border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-white/40 focus:bg-white/15"
                      placeholder="you@company.com"
                      autoComplete="email"
                    />
                    <div className="mt-1 flex items-center justify-between text-xs text-white/65">
                      <span className="text-red-200">{errors.email ?? ""}</span>
                      <span>
                        {form.email.length}/{LIMITS.emailMax}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-white">Phone Number</label>
                    <input
                      value={form.phone}
                      onChange={(e) => update("phone", sanitizePhone(e.target.value).slice(0, LIMITS.phoneMax))}
                      required
                      inputMode="tel"
                      maxLength={LIMITS.phoneMax}
                      aria-invalid={!!errors.phone}
                      className="mt-2 w-full border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-white/40 focus:bg-white/15"
                      placeholder="+1 416 555 0123"
                      autoComplete="tel"
                    />
                    <div className="mt-1 flex items-center justify-between text-xs text-white/65">
                      <span className="text-red-200">{errors.phone ?? ""}</span>
                      <span>
                        {form.phone.length}/{LIMITS.phoneMax}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white">Company Name</label>
                    <input
                      value={form.organization}
                      onChange={(e) => update("organization", e.target.value.slice(0, LIMITS.orgMax))}
                      required
                      maxLength={LIMITS.orgMax}
                      aria-invalid={!!errors.organization}
                      className="mt-2 w-full border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-white/40 focus:bg-white/15"
                      placeholder="Company / Organization"
                      autoComplete="organization"
                    />
                    <div className="mt-1 flex items-center justify-between text-xs text-white/65">
                      <span className="text-red-200">{errors.organization ?? ""}</span>
                      <span>
                        {form.organization.length}/{LIMITS.orgMax}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-white">Service Needed</label>
                  <select
                    value={form.service}
                    onChange={(e) => update("service", e.target.value)}
                    required
                    aria-invalid={!!errors.service}
                    className="mt-2 w-full border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-white/40 focus:bg-white/15"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt} className="text-slate-900">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <div className="mt-1 text-xs text-red-200">{errors.service ?? ""}</div>
                </div>

                <div>
                  <label className="text-sm font-medium text-white">Message / Project Description</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    required
                    rows={6}
                    aria-invalid={!!errors.message || messageTooLong}
                    className="mt-2 w-full resize-none border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-white/40 focus:bg-white/15"
                    placeholder="Describe what you need help with (scope, timeline, goal)."
                  />
                  <div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-xs text-white/65">
                    <span className="text-red-200">{errors.message ?? ""}</span>
                    <span className={messageTooLong ? "text-red-200" : "text-white/65"}>
                      {messageWordCount}/{LIMITS.messageWordsMax} words
                    </span>
                  </div>
                </div>

                {/* ✅ Turnstile CAPTCHA */}
                <div className="pt-2" ref={turnstileRef}>
                  <Turnstile
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    onSuccess={(token) => setTurnstileToken(token)}
                    onExpire={() => setTurnstileToken("")}
                    onError={() => setTurnstileToken("")}
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className={[
                      "inline-flex w-full justify-center px-5 py-2.5 text-sm font-semibold shadow-sm transition sm:w-auto",
                      canSubmit
                        ? "bg-white text-slate-900 hover:opacity-95"
                        : "cursor-not-allowed bg-white/50 text-slate-900/70",
                    ].join(" ")}
                  >
                    {submitting ? "Submitting..." : "Submit"}
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

            {/* RIGHT */}
            <div className="border border-white/10 bg-white/10 backdrop-blur-xl p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold tracking-tight text-white sm:text-lg">
                    What happens next?
                  </h2>
                  <p className="mt-2 text-sm text-white/85">Clear steps, fast response, and structured delivery.</p>
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
                <p className="mt-4 text-sm text-white/85">We work remotely with clients across multiple industries.</p>
              </div>

              <div className="sm:hidden mt-6">
                <LocationPill />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
