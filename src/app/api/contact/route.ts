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

    // ✅ CAPTCHA DISABLED FOR TESTING
    // (No Turnstile token required, no verification call)

    // ✅ repeat anti-bot checks server-side
    if (body.companyWebsite?.trim()) {
      return NextResponse.json({ error: "Submission blocked." }, { status: 400 });
    }
    if (typeof body.startedAt === "number") {
      const elapsedMs = Date.now() - body.startedAt;
      if (elapsedMs < MIN_SECONDS_BEFORE_SUBMIT * 1000) {
        return NextResponse.json({ error: "Submission blocked." }, { status: 400 });
      }
    }

    // ✅ required fields
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

    // ✅ ZOHO SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_MAIL_USER,
        pass: process.env.ZOHO_MAIL_PASS,
      },
    });

    const ownerEmail = process.env.CONTACT_OWNER_EMAIL || process.env.ZOHO_MAIL_USER;
    const fromEmail = process.env.ZOHO_MAIL_USER;

    // ✅ read logo from /public/email/yorkshire-logo.png
    const logoPath = path.join(process.cwd(), "public", "email", "yorkshire-logo.png");
    const logoBuffer = await fs.readFile(logoPath);

    const attachments = [
      {
        filename: "yorkshire-logo.png",
        content: logoBuffer,
        cid: "yorkshire_logo",
      },
    ];

    // 1) email owner
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

    // 2) acknowledgement to user
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
