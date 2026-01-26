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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    /* =====================================================
       1) TURNSTILE VERIFICATION (SERVER-SIDE)
    ====================================================== */
    const token = String(body.turnstileToken || "").trim();
    if (!token) {
      return NextResponse.json({ error: "Verification required." }, { status: 400 });
    }

    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) {
      return NextResponse.json(
        { error: "Server misconfigured (missing TURNSTILE_SECRET_KEY)." },
        { status: 500 }
      );
    }

    const ip =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      undefined;

    const formData = new FormData();
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
        { error: "Verification failed. Please try again." },
        { status: 403 }
      );
    }

    /* =====================================================
       2) SERVER-SIDE ANTI-BOT CHECKS
    ====================================================== */
    if (body.companyWebsite?.trim()) {
      return NextResponse.json({ error: "Submission blocked." }, { status: 400 });
    }

    if (typeof body.startedAt === "number") {
      const elapsedMs = Date.now() - body.startedAt;
      if (elapsedMs < MIN_SECONDS_BEFORE_SUBMIT * 1000) {
        return NextResponse.json({ error: "Submission blocked." }, { status: 400 });
      }
    }

    /* =====================================================
       3) REQUIRED FIELDS
    ====================================================== */
    const required = ["fullName", "email", "phone", "organization", "service", "message"];
    for (const k of required) {
      if (!String(body[k] ?? "").trim()) {
        return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
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
      return NextResponse.json(
        { error: "Email service not configured (missing ZOHO_MAIL_USER/ZOHO_MAIL_PASS)." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    const ownerEmail = process.env.CONTACT_OWNER_EMAIL || user;
    const fromEmail = user;

    /* =====================================================
       5) ATTACHMENTS (LOGO)
    ====================================================== */
    const logoPath = path.join(process.cwd(), "public", "email", "yorkshire-logo.png");
    const logoBuffer = await fs.readFile(logoPath);

    const attachments = [
      {
        filename: "yorkshire-logo.png",
        content: logoBuffer,
        cid: "yorkshire_logo",
      },
    ];

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
  } catch (err) {
    console.error("[CONTACT_API_ERROR]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
