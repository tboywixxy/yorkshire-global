"use client";

import Container from "@/src/components/Container";
import SectionHeading from "@/src/components/SectionHeading";
import React, { useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  service: string; // stable key
  message: string;
  companyWebsite: string; // honeypot
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
  messageCharsSoftMax: 1400
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

function sanitizePhone(value: string) {
  let v = value.replace(/[^\d+\s()-]/g, "");
  v = v.replace(/\+/g, (m, offset) => (offset === 0 ? "+" : ""));
  return v;
}

function looksLikePhone(value: string) {
  if (!/^\+?[\d\s()-]+$/.test(value.trim())) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

type PopupState =
  | { open: false }
  | { open: true; type: "success" | "error"; title: string; message: string };

function Popup({
  state,
  onClose,
  closeLabel
}: {
  state: PopupState;
  onClose: () => void;
  closeLabel: string;
}) {
  if (!state.open) return null;

  const isSuccess = state.type === "success";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="absolute inset-0 bg-black/60"
      />

      <div className="relative w-full max-w-md border border-white/15 bg-slate-950/80 backdrop-blur-xl p-5 shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
        <div className="flex items-start gap-3">
          <div
            className={[
              "flex h-10 w-10 shrink-0 items-center justify-center border text-sm font-semibold",
              isSuccess
                ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                : "border-red-400/30 bg-red-400/10 text-red-200"
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
            {closeLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const t = useTranslations("Contact");

  const serviceOptions = useMemo(
    () => [
      { value: "ssdlc", label: t("services.ssdlc") },
      { value: "cybersecurity", label: t("services.cybersecurity") },
      { value: "businessAnalysis", label: t("services.businessAnalysis") },
      { value: "projectManagement", label: t("services.projectManagement") },
      { value: "strategy", label: t("services.strategy") },
      { value: "other", label: t("services.other") }
    ],
    [t]
  );

  const startedAtRef = useRef<number>(typeof window !== "undefined" ? Date.now() : 0);

  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    service: serviceOptions[0]?.value ?? "ssdlc",
    message: "",
    companyWebsite: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [popup, setPopup] = useState<PopupState>({ open: false });

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => {
      const next = { ...p };
      delete next[key as string];
      delete next.form;
      return next;
    });
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

    if (!form.fullName.trim()) next.fullName = t("errors.fullNameRequired");
    else if (form.fullName.trim().length > LIMITS.fullNameMax)
      next.fullName = t("errors.fullNameMax", { max: LIMITS.fullNameMax });

    if (!form.email.trim()) next.email = t("errors.emailRequired");
    else if (form.email.trim().length > LIMITS.emailMax)
      next.email = t("errors.emailMax", { max: LIMITS.emailMax });
    else if (!looksLikeEmail(form.email)) next.email = t("errors.emailInvalid");

    if (!form.phone.trim()) next.phone = t("errors.phoneRequired");
    else if (form.phone.trim().length > LIMITS.phoneMax)
      next.phone = t("errors.phoneMax", { max: LIMITS.phoneMax });
    else if (!looksLikePhone(form.phone)) next.phone = t("errors.phoneInvalid");

    if (!form.organization.trim()) next.organization = t("errors.companyRequired");
    else if (form.organization.trim().length > LIMITS.orgMax)
      next.organization = t("errors.companyMax", { max: LIMITS.orgMax });

    if (!form.service.trim()) next.service = t("errors.serviceRequired");

    if (!form.message.trim()) next.message = t("errors.messageRequired");
    else if (messageWordCount > LIMITS.messageWordsMax)
      next.message = t("errors.messageWordsMax", { max: LIMITS.messageWordsMax });
    else if (form.message.length > LIMITS.messageCharsSoftMax)
      next.message = t("errors.messageCharsMax", { max: LIMITS.messageCharsSoftMax });

    if (form.companyWebsite.trim()) next.form = t("errors.blocked");

    const elapsedMs = Date.now() - startedAtRef.current;
    if (elapsedMs < MIN_SECONDS_BEFORE_SUBMIT * 1000) next.form = t("errors.blocked");

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
      service: serviceOptions[0]?.value ?? "ssdlc",
      message: "",
      companyWebsite: ""
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (form.companyWebsite.trim()) {
      setErrors({ form: t("errors.blocked") });
      setPopup({
        open: true,
        type: "error",
        title: t("popup.blockedTitle"),
        message: t("popup.blockedMessage")
      });
      return;
    }

    if (!looksLikeEmail(form.email)) {
      setErrors((p) => ({ ...p, email: t("errors.emailInvalid") }));
      setPopup({
        open: true,
        type: "error",
        title: t("popup.invalidEmailTitle"),
        message: t("popup.invalidEmailMessage")
      });
      return;
    }

    if (!validate()) {
      setPopup({
        open: true,
        type: "error",
        title: t("popup.fixFormTitle"),
        message: t("popup.fixFormMessage")
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
          service: form.service, // stable key
          message: form.message,
          companyWebsite: form.companyWebsite,
          startedAt: startedAtRef.current
        })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrors({ form: data?.error ?? t("errors.failedGeneric") });
        setPopup({
          open: true,
          type: "error",
          title: t("popup.failedTitle"),
          message: data?.error ?? t("popup.failedMessage")
        });
        return;
      }

      setPopup({
        open: true,
        type: "success",
        title: t("popup.successTitle"),
        message: t("popup.successMessage")
      });
      resetForm();
    } catch {
      setErrors({ form: t("errors.failedGeneric") });
      setPopup({
        open: true,
        type: "error",
        title: t("popup.failedTitle"),
        message: t("popup.networkFailedMessage")
      });
    } finally {
      setSubmitting(false);
    }
  }

  const LocationPill = () => (
    <div className="inline-flex items-center gap-2 border border-white/15 bg-white/10 px-3 py-2 text-xs text-white">
      <CanadaFlagIcon className="h-4 w-6" />
      <span>{t("locationPill")}</span>
    </div>
  );

  return (
    <>
      <Popup state={popup} onClose={() => setPopup({ open: false })} closeLabel={t("popup.close")} />

      <section className="relative overflow-hidden -mt-14 pt-[6.75rem] pb-12 sm:pt-[7.75rem] sm:pb-14 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-0 scale-110 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2400&q=80')"
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/55" />
        </div>

        <Container>
          <h1 className="sr-only">{t("srOnlyTitle")}</h1>

          <SectionHeading title={t("heroTitle")} subtitle={t("heroSubtitle")} />

          <div className="mt-8 grid gap-7 lg:grid-cols-2">
            {/* LEFT */}
            <div className="border border-white/10 bg-white/10 backdrop-blur-xl p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold tracking-tight text-white sm:text-lg">
                    {t("contactFormTitle")}
                  </h2>
                  <p className="mt-1 text-sm text-white/85">
                    {t("contactFormBlurbA")}{" "}
                    <span className="font-semibold text-white">{t("contactFormBlurbB")}</span>.
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

              <form onSubmit={onSubmit} className="mt-5 space-y-3.5" aria-label={t("formAriaLabel")}>
                {/* honeypot */}
                <div
                  aria-hidden="true"
                  className="absolute left-[-10000px] top-auto h-[1px] w-[1px] overflow-hidden"
                >
                  <label className="text-sm font-medium text-white">{t("honeypotLabel")}</label>
                  <input
                    value={form.companyWebsite}
                    onChange={(e) => update("companyWebsite", e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-white">{t("labels.fullName")}</label>
                    <input
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value.slice(0, LIMITS.fullNameMax))}
                      required
                      maxLength={LIMITS.fullNameMax}
                      aria-invalid={!!errors.fullName}
                      className="mt-2 w-full border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-white/40 focus:bg-white/15"
                      placeholder={t("placeholders.fullName")}
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
                    <label className="text-sm font-medium text-white">{t("labels.email")}</label>
                    <input
                      value={form.email}
                      onChange={(e) => update("email", e.target.value.slice(0, LIMITS.emailMax))}
                      required
                      type="email"
                      inputMode="email"
                      maxLength={LIMITS.emailMax}
                      aria-invalid={!!errors.email}
                      className="mt-2 w-full border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-white/40 focus:bg-white/15"
                      placeholder={t("placeholders.email")}
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
                    <label className="text-sm font-medium text-white">{t("labels.phone")}</label>
                    <input
                      value={form.phone}
                      onChange={(e) =>
                        update("phone", sanitizePhone(e.target.value).slice(0, LIMITS.phoneMax))
                      }
                      required
                      inputMode="tel"
                      maxLength={LIMITS.phoneMax}
                      aria-invalid={!!errors.phone}
                      className="mt-2 w-full border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-white/40 focus:bg-white/15"
                      placeholder={t("placeholders.phone")}
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
                    <label className="text-sm font-medium text-white">{t("labels.company")}</label>
                    <input
                      value={form.organization}
                      onChange={(e) => update("organization", e.target.value.slice(0, LIMITS.orgMax))}
                      required
                      maxLength={LIMITS.orgMax}
                      aria-invalid={!!errors.organization}
                      className="mt-2 w-full border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-white/40 focus:bg-white/15"
                      placeholder={t("placeholders.company")}
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
                  <label className="text-sm font-medium text-white">{t("labels.service")}</label>
                  <select
                    value={form.service}
                    onChange={(e) => update("service", e.target.value)}
                    required
                    aria-invalid={!!errors.service}
                    className="mt-2 w-full border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-white/40 focus:bg-white/15"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="text-slate-900">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="mt-1 text-xs text-red-200">{errors.service ?? ""}</div>
                </div>

                <div>
                  <label className="text-sm font-medium text-white">{t("labels.message")}</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    required
                    rows={6}
                    aria-invalid={!!errors.message || messageTooLong}
                    className="mt-2 w-full resize-none border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-white/40 focus:bg-white/15"
                    placeholder={t("placeholders.message")}
                  />
                  <div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-xs text-white/65">
                    <span className="text-red-200">{errors.message ?? ""}</span>
                    <span className={messageTooLong ? "text-red-200" : "text-white/65"}>
                      {t("counters.words", { count: messageWordCount, max: LIMITS.messageWordsMax })}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className={[
                      "inline-flex w-full justify-center px-5 py-2.5 text-sm font-semibold shadow-sm transition sm:w-auto",
                      canSubmit
                        ? "bg-white text-slate-900 hover:opacity-95"
                        : "cursor-not-allowed bg-white/50 text-slate-900/70"
                    ].join(" ")}
                  >
                    {submitting ? t("submit.submitting") : t("submit.submit")}
                  </button>

                  <p className="text-xs text-white/75">{t("submit.consent")}</p>
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
                    {t("right.title")}
                  </h2>
                  <p className="mt-2 text-sm text-white/85">{t("right.subtitle")}</p>
                </div>

                <div className="hidden sm:block">
                  <LocationPill />
                </div>
              </div>

              <div className="mt-5 space-y-3.5">
                {(t.raw("right.steps") as string[]).map((text: string, i: number) => (
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
                <p className="text-sm font-semibold text-white">{t("right.locationTitle")}</p>
                <p className="mt-2 text-sm text-white/85 inline-flex items-center gap-2">
                  <CanadaFlagIcon className="h-4 w-6" />
                  {t("right.locationLine")}
                </p>
                <p className="mt-4 text-sm text-white/85">{t("right.remoteLine")}</p>
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
