import { NextResponse } from "next/server";

export type ContactApiErrorCode =
  | "CONFIGURATION_ERROR"
  | "RATE_LIMITED"
  | "TURNSTILE_REQUIRED"
  | "TURNSTILE_INVALID"
  | "TURNSTILE_HOSTNAME_MISMATCH"
  | "TURNSTILE_VERIFICATION_ERROR"
  | "HONEYPOT_FILLED"
  | "SUBMISSION_TOO_FAST"
  | "VALIDATION_ERROR"
  | "INTERNAL_ERROR";

export type ContactApiErrorResponse = {
  ok: false;
  error: {
    code: ContactApiErrorCode;
    message: string;
    fieldErrors?: Record<string, string>;
  };
  retryAfterSeconds?: number;
};

export type ContactApiSuccessResponse = {
  ok: true;
  message: string;
};

type ErrorResponseOptions = {
  status: number;
  retryAfterSeconds?: number;
  fieldErrors?: Record<string, string>;
  headers?: HeadersInit;
};

export function errorResponse(
  code: ContactApiErrorCode,
  message: string,
  options: ErrorResponseOptions
) {
  const payload: ContactApiErrorResponse = {
    ok: false,
    error: {
      code,
      message,
      ...(options.fieldErrors ? { fieldErrors: options.fieldErrors } : {}),
    },
    ...(typeof options.retryAfterSeconds === "number"
      ? { retryAfterSeconds: options.retryAfterSeconds }
      : {}),
  };

  return NextResponse.json(payload, {
    status: options.status,
    headers: options.headers,
  });
}

export function successResponse(message = "Message received.") {
  const payload: ContactApiSuccessResponse = {
    ok: true,
    message,
  };

  return NextResponse.json(payload, { status: 200 });
}
