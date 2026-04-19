import nodemailer from "nodemailer";
import path from "path";
import fs from "fs/promises";

import {
  ownerEmailTemplate,
  ackEmailTemplate,
  type ContactPayload,
} from "@/src/email/contactTemplates";
import { errorResponse, successResponse } from "@/src/lib/contact/api";
import { RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_MS } from "@/src/lib/contact/constants";
import { logContactEvent, maskEmail } from "@/src/lib/contact/logger";
import { consumeRateLimit } from "@/src/lib/contact/rateLimit";
import { verifyTurnstileToken } from "@/src/lib/contact/turnstile";
import { validateAndSanitizeContactBody } from "@/src/lib/contact/validation";

function getClientIp(req: Request) {
  const cfIp = req.headers.get("cf-connecting-ip")?.trim();
  const forwardedFor = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = req.headers.get("x-real-ip")?.trim();

  return cfIp || forwardedFor || realIp || "anonymous";
}

function getRateLimitKey(req: Request, ip: string) {
  const userAgent = req.headers.get("user-agent")?.trim() || "unknown";
  return ip !== "anonymous" ? `ip:${ip}` : `ip:${ip}:ua:${userAgent.slice(0, 120)}`;
}

export async function POST(req: Request) {
  const requestId = crypto.randomUUID();
  const ip = getClientIp(req);
  const userAgent = req.headers.get("user-agent")?.trim() || "unknown";
  const originHost = req.headers.get("host")?.trim() || new URL(req.url).host;

  try {
    const body = await req.json();
    const rateLimit = await consumeRateLimit({
      key: getRateLimitKey(req, ip),
      limit: RATE_LIMIT_MAX_REQUESTS,
      windowMs: RATE_LIMIT_WINDOW_MS,
    });

    if (rateLimit.limited) {
      logContactEvent("warn", "rate_limited", {
        requestId,
        ip,
        userAgent,
        originHost,
        remaining: rateLimit.remaining,
        retryAfterSeconds: rateLimit.retryAfterSeconds,
        count: rateLimit.count,
      });

      return errorResponse(
        "RATE_LIMITED",
        "You have sent several messages recently. Please wait a little while and try again.",
        {
          status: 429,
          retryAfterSeconds: rateLimit.retryAfterSeconds,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds),
          },
        }
      );
    }

    const validation = validateAndSanitizeContactBody(body);
    if (!validation.ok) {
      logContactEvent(
        "warn",
        validation.code === "HONEYPOT_FILLED" ? "honeypot_hit" : "validation_failed",
        {
          requestId,
          ip,
          userAgent,
          originHost,
          code: validation.code,
          fieldErrors: validation.fieldErrors,
          details: validation.details,
        }
      );

      return errorResponse(validation.code, validation.message, {
        status:
          validation.code === "HONEYPOT_FILLED"
            ? 400
            : validation.code === "SUBMISSION_TOO_FAST"
              ? 400
              : 422,
        fieldErrors: validation.fieldErrors,
      });
    }

    const token = String((body as Record<string, unknown>)?.turnstileToken || "").trim();
    const turnstile = await verifyTurnstileToken({
      token,
      remoteIp: ip !== "anonymous" ? ip : undefined,
    });

    if (!turnstile.ok) {
      logContactEvent(
        turnstile.code === "CONFIGURATION_ERROR" ? "error" : "warn",
        "turnstile_failed",
        {
          requestId,
          ip,
          userAgent,
          originHost,
          code: turnstile.code,
          hostname: turnstile.hostname,
          errorCodes: turnstile.errorCodes,
        }
      );

      return errorResponse(
        turnstile.code,
        turnstile.code === "CONFIGURATION_ERROR"
          ? "System configuration error. Please contact us directly."
          : turnstile.message,
        {
          status: turnstile.code === "CONFIGURATION_ERROR" ? 500 : 403,
        }
      );
    }

    const payload: ContactPayload = {
      fullName: validation.data.fullName,
      email: validation.data.email,
      phone: validation.data.phone,
      organization: validation.data.organization,
      service: validation.data.service,
      message: validation.data.message,
    };

    const user = process.env.ZOHO_MAIL_USER;
    const pass = process.env.ZOHO_MAIL_PASS;

    if (!user || !pass) {
      logContactEvent("error", "email_config_missing", {
        requestId,
        ip,
        originHost,
      });

      return errorResponse(
        "CONFIGURATION_ERROR",
        "System configuration error. Please contact us directly.",
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 587,
      secure: false,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000,
    });

    const ownerEmail = process.env.CONTACT_OWNER_EMAIL || user;
    const fromEmail = user;

    const logoPath = path.join(process.cwd(), "public", "email", "yorkshire-logo.png");
    let attachments: { filename: string; content: Buffer; cid: string }[] = [];

    try {
      await fs.access(logoPath);
      const logoBuffer = await fs.readFile(logoPath);
      attachments.push({
        filename: "yorkshire-logo.png",
        content: logoBuffer,
        cid: "yorkshire_logo",
      });
    } catch (err) {
      logContactEvent("warn", "logo_attachment_missing", {
        requestId,
        error: err,
      });
    }

    const ownerTpl = ownerEmailTemplate(payload);
    await transporter.sendMail({
      from: `"Yorkshire Global" <${fromEmail}>`,
      to: ownerEmail,
      replyTo: payload.email,
      subject: ownerTpl.subject,
      html: ownerTpl.html,
      text: ownerTpl.text,
      attachments,
    });

    const ackTpl = ackEmailTemplate({
      fullName: payload.fullName,
      service: payload.service,
      organization: payload.organization,
    });

    await transporter.sendMail({
      from: `"Yorkshire Global" <${fromEmail}>`,
      to: payload.email,
      subject: ackTpl.subject,
      html: ackTpl.html,
      text: ackTpl.text,
      attachments,
    });

    logContactEvent("info", "submission_accepted", {
      requestId,
      ip,
      originHost,
      userAgent,
      hostname: turnstile.hostname,
      service: payload.service,
      email: maskEmail(payload.email),
      messageLength: payload.message.length,
      wordCount: payload.message.split(/\s+/).filter(Boolean).length,
      rateLimitRemaining: rateLimit.remaining,
    });

    return successResponse("Thanks! We received your message and will reply within 24 hours.");
  } catch (err: any) {
    logContactEvent("error", "submission_error", {
      requestId,
      ip,
      originHost,
      error: err,
    });

    if (err?.responseCode === 535) {
      logContactEvent("error", "zoho_auth_failed", {
        requestId,
        message: "Make sure you are using an App Password if 2FA is enabled on Zoho.",
      });
    }

    return errorResponse(
      "INTERNAL_ERROR",
      "We could not submit your message right now. Please try again shortly.",
      { status: 500 }
    );
  }
}
