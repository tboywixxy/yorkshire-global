import {
  CONTACT_LIMITS,
  CONTACT_SERVICE_VALUES,
  MAX_SUBMISSION_AGE_MS,
  MIN_SECONDS_BEFORE_SUBMIT,
} from "@/src/lib/contact/constants";

type ContactFormBody = {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  service: string;
  message: string;
  companyWebsite: string;
  startedAt: number;
};

export type SanitizedContactPayload = ContactFormBody;

export type ValidationResult =
  | {
      ok: true;
      data: SanitizedContactPayload;
    }
  | {
      ok: false;
      code: "HONEYPOT_FILLED" | "SUBMISSION_TOO_FAST" | "VALIDATION_ERROR";
      message: string;
      fieldErrors?: Record<string, string>;
      details?: Record<string, unknown>;
    };

function stripUnsafeCharacters(value: string) {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

function normalizeSingleLine(value: unknown, max: number) {
  return stripUnsafeCharacters(String(value ?? ""))
    .normalize("NFKC")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function normalizeMessage(value: unknown) {
  return stripUnsafeCharacters(String(value ?? ""))
    .normalize("NFKC")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[^\S\n]+/g, " ").trim())
    .join("\n")
    .trim()
    .slice(0, CONTACT_LIMITS.messageCharsSoftMax);
}

function sanitizePhone(value: unknown) {
  let phone = stripUnsafeCharacters(String(value ?? ""))
    .normalize("NFKC")
    .replace(/[^\d+\s()-]/g, "")
    .replace(/\+/g, (match, offset) => (offset === 0 ? match : ""))
    .replace(/\s+/g, " ")
    .trim();

  if (phone.length > CONTACT_LIMITS.phoneMax) {
    phone = phone.slice(0, CONTACT_LIMITS.phoneMax);
  }

  return phone;
}

function countWords(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function looksLikePhone(value: string) {
  if (!/^\+?[\d\s()-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export function validateAndSanitizeContactBody(body: unknown): ValidationResult {
  const raw = body && typeof body === "object" ? (body as Record<string, unknown>) : {};

  const sanitized: SanitizedContactPayload = {
    fullName: normalizeSingleLine(raw.fullName, CONTACT_LIMITS.fullNameMax),
    email: normalizeSingleLine(raw.email, CONTACT_LIMITS.emailMax).toLowerCase(),
    phone: sanitizePhone(raw.phone),
    organization: normalizeSingleLine(raw.organization, CONTACT_LIMITS.orgMax),
    service: normalizeSingleLine(raw.service, 40),
    message: normalizeMessage(raw.message),
    companyWebsite: normalizeSingleLine(raw.companyWebsite, CONTACT_LIMITS.honeypotMax),
    startedAt: Number(raw.startedAt),
  };

  if (sanitized.companyWebsite) {
    return {
      ok: false,
      code: "HONEYPOT_FILLED",
      message: "Submission blocked.",
      details: {
        honeypotLength: sanitized.companyWebsite.length,
      },
    };
  }

  if (!Number.isFinite(sanitized.startedAt)) {
    return {
      ok: false,
      code: "VALIDATION_ERROR",
      message: "Please refresh the page and try again.",
      fieldErrors: {
        form: "Missing or invalid form timing data.",
      },
    };
  }

  const elapsedMs = Date.now() - sanitized.startedAt;
  if (elapsedMs < MIN_SECONDS_BEFORE_SUBMIT * 1000) {
    return {
      ok: false,
      code: "SUBMISSION_TOO_FAST",
      message: "Please take a moment to review your details before submitting.",
      details: {
        elapsedMs,
        minElapsedMs: MIN_SECONDS_BEFORE_SUBMIT * 1000,
      },
    };
  }

  if (elapsedMs > MAX_SUBMISSION_AGE_MS) {
    return {
      ok: false,
      code: "VALIDATION_ERROR",
      message: "This form session expired. Please refresh and try again.",
      fieldErrors: {
        form: "Form session expired.",
      },
      details: {
        elapsedMs,
        maxElapsedMs: MAX_SUBMISSION_AGE_MS,
      },
    };
  }

  const fieldErrors: Record<string, string> = {};

  if (!sanitized.fullName) fieldErrors.fullName = "Full name is required.";
  else if (sanitized.fullName.length > CONTACT_LIMITS.fullNameMax)
    fieldErrors.fullName = `Keep your name under ${CONTACT_LIMITS.fullNameMax} characters.`;

  if (!sanitized.email) fieldErrors.email = "Email is required.";
  else if (!looksLikeEmail(sanitized.email))
    fieldErrors.email = "Please enter a valid email address.";

  if (!sanitized.phone) fieldErrors.phone = "Phone number is required.";
  else if (!looksLikePhone(sanitized.phone))
    fieldErrors.phone = "Please enter a valid phone number.";

  if (!sanitized.organization) fieldErrors.organization = "Company name is required.";
  if (!sanitized.service) fieldErrors.service = "Please choose a service.";
  else if (
    !CONTACT_SERVICE_VALUES.includes(sanitized.service as (typeof CONTACT_SERVICE_VALUES)[number])
  ) {
    fieldErrors.service = "Please choose a valid service.";
  }

  if (!sanitized.message) fieldErrors.message = "Message is required.";
  else {
    const words = countWords(sanitized.message);
    if (words > CONTACT_LIMITS.messageWordsMax) {
      fieldErrors.message = `Please keep your message to ${CONTACT_LIMITS.messageWordsMax} words or fewer.`;
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      code: "VALIDATION_ERROR",
      message: "Please review the highlighted fields and try again.",
      fieldErrors,
      details: {
        invalidFields: Object.keys(fieldErrors),
      },
    };
  }

  return {
    ok: true,
    data: sanitized,
  };
}
