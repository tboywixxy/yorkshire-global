// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs/promises";

import {
  ownerEmailTemplate,
  ackEmailTemplate,
  type ContactPayload,
} from "@/src/email/contactTemplates";

const MIN_SECONDS_BEFORE_SUBMIT = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const globalForRateLimit = globalThis as typeof globalThis & {
  __contactRateLimitStore?: Map<string, RateLimitEntry>;
};

const contactRateLimitStore = globalForRateLimit.__contactRateLimitStore ?? new Map<string, RateLimitEntry>();

globalForRateLimit.__contactRateLimitStore = contactRateLimitStore;

function getClientKey(req: Request) {
  const forwardedFor = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const cfIp = req.headers.get("cf-connecting-ip")?.trim();
  const realIp = req.headers.get("x-real-ip")?.trim();

  return cfIp || forwardedFor || realIp || "anonymous";
}

function enforceRateLimit(key: string) {
  const now = Date.now();
  const existing = contactRateLimitStore.get(key);

  if (!existing || existing.resetAt <= now) {
    contactRateLimitStore.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });

    return {
      limited: false,
      remaining: RATE_LIMIT_MAX_REQUESTS - 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    };
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      limited: true,
      remaining: 0,
      resetAt: existing.resetAt,
    };
  }

  existing.count += 1;
  contactRateLimitStore.set(key, existing);

  return {
    limited: false,
    remaining: RATE_LIMIT_MAX_REQUESTS - existing.count,
    resetAt: existing.resetAt,
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const clientKey = getClientKey(req);
    const rateLimit = enforceRateLimit(clientKey);

    if (rateLimit.limited) {
      const retryAfterSeconds = Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1000));

      return NextResponse.json(
        {
          error: "You have sent several messages recently. Please wait a little while and try again.",
          retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfterSeconds),
          },
        }
      );
    }

    /* =====================================================
       1) TURNSTILE VERIFICATION (SERVER-SIDE)
    ====================================================== */
    const token = String(body.turnstileToken || "").trim();
    if (!token) {
      // User-friendly client side will catch this, but backend must be strict
      return NextResponse.json({ error: "Please complete the security check." }, { status: 400 });
    }

    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) {
      console.error("Missing TURNSTILE_SECRET_KEY");
      return NextResponse.json(
        { error: "System configuration error. Please contact us directly." },
        { status: 500 }
      );
    }

    const ip =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      undefined;

    // Use URLSearchParams for application/x-www-form-urlencoded
    const formData = new URLSearchParams();
    formData.append("secret", secret);
    formData.append("response", token);
    if (ip) formData.append("remoteip", ip);

    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });

    const verify = await verifyRes.json().catch(() => null);

    if (!verify?.success) {
      return NextResponse.json(
        { error: "Security check failed. Please refresh and try again." },
        { status: 403 }
      );
    }

    /* =====================================================
       2) SERVER-SIDE ANTI-BOT CHECKS
    ====================================================== */
    if (body.companyWebsite?.trim()) {
      return NextResponse.json({ error: "Submission pattern identified as spam." }, { status: 400 });
    }

    if (typeof body.startedAt === "number") {
      const elapsedMs = Date.now() - body.startedAt;
      if (elapsedMs < MIN_SECONDS_BEFORE_SUBMIT * 1000) {
        return NextResponse.json({ error: "Please take a moment to review your details before submitting." }, { status: 400 });
      }
    }

    /* =====================================================
       3) REQUIRED FIELDS
    ====================================================== */
    const required = ["fullName", "email", "phone", "organization", "service", "message"];
    for (const k of required) {
      if (!String(body[k] ?? "").trim()) {
        return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
      }
    }

    const payload: ContactPayload = {
      fullName: String(body.fullName),
      email: String(body.email),
      phone: String(body.phone),
      organization: String(body.organization),
      service: String(body.service),
      message: String(body.message),
    };

    /* =====================================================
       4) ZOHO SMTP
    ====================================================== */
    const user = process.env.ZOHO_MAIL_USER;
    const pass = process.env.ZOHO_MAIL_PASS;

    if (!user || !pass) {
      console.warn("⚠️  Email service not configured (missing ZOHO_MAIL_USER/ZOHO_MAIL_PASS). Skipping email send for testing.");
      return NextResponse.json({ ok: true });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 587,      // Using STARTTLS port instead of 465 SSL
      secure: false,  // false for 587, true for 465
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 10000, 
    });

    const ownerEmail = process.env.CONTACT_OWNER_EMAIL || user;
    const fromEmail = user;

    /* =====================================================
       5) ATTACHMENTS (LOGO)
    ====================================================== */
    const logoPath = path.join(process.cwd(), "public", "email", "yorkshire-logo.png");
    let attachments: { filename: string; content: Buffer; cid: string }[] = [];

    try {
      // Check if file exists before reading
      await fs.access(logoPath);
      const logoBuffer = await fs.readFile(logoPath);
      attachments.push({
        filename: "yorkshire-logo.png",
        content: logoBuffer,
        cid: "yorkshire_logo",
      });
    } catch (err) {
      console.warn("[CONTACT_API] Logo file not found or readable, sending email without logo attachment.", err);
    }

    /* =====================================================
       6) SEND EMAILS
    ====================================================== */
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

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[CONTACT_API_ERROR]", err);

    // If strictly authentication error, warn about 2FA/App Password
    if (err.responseCode === 535) {
      console.error(
        "Make sure you are using an App Password if 2FA is enabled on Zoho."
      );
    }

    return NextResponse.json(
      { error: err.message || "Server error." },
      { status: 500 }
    );
  }
}
