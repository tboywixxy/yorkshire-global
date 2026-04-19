export const CONTACT_LIMITS = {
  fullNameMax: 80,
  emailMax: 120,
  phoneMax: 24,
  orgMax: 60,
  messageWordsMax: 200,
  messageCharsSoftMax: 1400,
  honeypotMax: 200,
} as const;

export const MIN_SECONDS_BEFORE_SUBMIT = 3;
export const MAX_SUBMISSION_AGE_MS = 24 * 60 * 60 * 1000;
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
export const RATE_LIMIT_MAX_REQUESTS = 5;

export const CONTACT_SERVICE_VALUES = [
  "managedIT",
  "secureAI",
  "ssdlc",
  "cybersecurity",
  "businessAnalysis",
  "projectManagement",
  "strategy",
  "other",
] as const;

export type ContactServiceValue = (typeof CONTACT_SERVICE_VALUES)[number];
