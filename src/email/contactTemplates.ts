// src/email/contactTemplates.ts

function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export type ContactPayload = {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  service: string;
  message: string;
};

// ✅ LIGHT MODE THEME (single theme — no dark mode)
const BRAND = {
  pageBg: "#f6f7fb",        // very light grey background
  cardBg: "#ffffff",        // white card
  border: "#e5e7eb",        // light grey border
  text: "#111827",          // slate-900
  muted: "#4b5563",         // slate-600
  subtle: "#6b7280",        // slate-500
  accent: "#2563eb",        // blue-600
};

function shell({
  title,
  preheader,
  bodyHtml,
}: {
  title: string;
  preheader: string;
  bodyHtml: string;
}) {
  return `<!doctype html>
<html>
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>

    <style>
      /* Email-safe-ish responsive helpers */
      @media screen and (max-width: 520px) {
        .container { width: 100% !important; }
        .stack { display: block !important; width: 100% !important; }
        .hide-sm { display: none !important; }
        .show-sm { display: block !important; }
        .center-sm { text-align: center !important; }
        .pad-sm { padding-left: 10px !important; padding-right: 10px !important; }
        .logo-sm { margin-left: auto !important; margin-right: auto !important; }
      }
      /* default states */
      .show-sm { display: none; }
    </style>
  </head>

  <body style="margin:0;padding:0;background:${BRAND.pageBg};font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${escapeHtml(preheader)}
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${BRAND.pageBg};padding:24px 12px;">
      <tr>
        <td align="center" class="pad-sm">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" class="container" style="width:640px;max-width:640px;">
            <!-- HEADER ROW (desktop layout) -->
            <tr>
              <td style="padding:0 0 8px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td class="stack center-sm" align="left" style="padding:0;">
                      <img
                        src="cid:yorkshire_logo"
                        width="260"
                        alt="Yorkshire Global Consulting Inc."
                        class="logo-sm"
                        style="display:block;border:0;outline:none;text-decoration:none;max-width:260px;height:auto;"
                      />
                    </td>

                    <!-- desktop only location -->
                    <td class="hide-sm" align="right" style="padding:0;color:${BRAND.subtle};font-size:12px;vertical-align:middle;">
                      Ontario, Canada
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- MOBILE LOCATION (below logo, centered) -->
            <tr class="show-sm">
              <td class="show-sm center-sm" style="padding:0 0 10px 0;color:${BRAND.subtle};font-size:12px;">
                Ontario, Canada
              </td>
            </tr>

            <!-- CARD -->
            <tr>
              <td style="background:${BRAND.cardBg};border:1px solid ${BRAND.border};padding:20px;">
                ${bodyHtml}
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="padding:14px 6px 0 6px;color:${BRAND.subtle};font-size:12px;line-height:1.5;">
                © ${new Date().getFullYear()} Yorkshire Global Consulting Inc.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function ownerEmailTemplate(p: ContactPayload) {
  const subject = `New Inquiry: ${p.service} — ${p.organization}`;
  const messageHtml = escapeHtml(p.message).replace(/\n/g, "<br/>");

  const bodyHtml = `
    <h1 style="margin:0 0 8px 0;color:${BRAND.text};font-size:18px;line-height:1.3;">
      New contact form submission
    </h1>
    <p style="margin:0 0 16px 0;color:${BRAND.muted};font-size:13px;line-height:1.6;">
      A new inquiry was submitted on your website. You can reply directly to the sender.
    </p>

    <div style="height:1px;background:${BRAND.border};margin:14px 0;"></div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
      ${row("Full name", escapeHtml(p.fullName))}
      ${row(
        "Email",
        `<a href="mailto:${encodeURIComponent(
          p.email
        )}" style="color:${BRAND.accent};text-decoration:none;">${escapeHtml(p.email)}</a>`
      )}
      ${row("Phone", escapeHtml(p.phone))}
      ${row("Company", escapeHtml(p.organization))}
      ${row("Service", escapeHtml(p.service))}
    </table>

    <div style="height:1px;background:${BRAND.border};margin:14px 0;"></div>

    <p style="margin:0 0 8px 0;color:${BRAND.muted};font-size:13px;">Message</p>

    <div style="background:#f9fafb;border:1px solid ${BRAND.border};padding:14px;color:${BRAND.text};font-size:13px;line-height:1.7;">
      ${messageHtml}
    </div>

    <p style="margin:14px 0 0 0;color:${BRAND.subtle};font-size:12px;">
      Tip: hit <b style="color:${BRAND.text};">Reply</b> to respond to the sender.
    </p>
  `;

  const html = shell({
    title: "New Contact Form Submission",
    preheader: `New inquiry from ${p.fullName} (${p.organization})`,
    bodyHtml,
  });

  const text =
    `New contact form submission\n\n` +
    `Full name: ${p.fullName}\n` +
    `Email: ${p.email}\n` +
    `Phone: ${p.phone}\n` +
    `Company: ${p.organization}\n` +
    `Service: ${p.service}\n\n` +
    `Message:\n${p.message}\n`;

  return { subject, html, text };
}

export function ackEmailTemplate(p: Pick<ContactPayload, "fullName" | "service" | "organization">) {
  const subject = "We received your message";

  const bodyHtml = `
    <h1 style="margin:0 0 8px 0;color:${BRAND.text};font-size:18px;line-height:1.3;">
      Thanks — we got your message
    </h1>
    <p style="margin:0 0 14px 0;color:${BRAND.text};font-size:13px;line-height:1.7;">
      Hi <b style="color:${BRAND.text};">${escapeHtml(p.fullName)}</b>,<br/><br/>
      We’ve received your inquiry and will respond within <b style="color:${BRAND.text};">24 hours</b>.
    </p>

    <div style="background:#f9fafb;border:1px solid ${BRAND.border};padding:14px;">
      <div style="color:${BRAND.muted};font-size:12px;margin-bottom:8px;">Summary</div>
      <div style="color:${BRAND.text};font-size:13px;line-height:1.6;">
        <div><span style="color:${BRAND.muted};">Service:</span> ${escapeHtml(p.service)}</div>
        <div><span style="color:${BRAND.muted};">Company:</span> ${escapeHtml(p.organization)}</div>
      </div>
    </div>

    <p style="margin:14px 0 0 0;color:${BRAND.subtle};font-size:12px;line-height:1.6;">
      Yorkshire Global Consulting Inc.
    </p>
  `;

  const html = shell({
    title: "We received your message",
    preheader: "Thanks — your message has been received.",
    bodyHtml,
  });

  const text =
    `Hi ${p.fullName},\n\n` +
    `We’ve received your inquiry and will respond within 24 hours.\n\n` +
    `Summary:\nService: ${p.service}\nCompany: ${p.organization}\n\n` +
    `— Yorkshire Global Consulting Inc.`;

  return { subject, html, text };
}

function row(label: string, valueHtml: string) {
  return `
    <tr>
      <td style="padding:8px 0;color:${BRAND.muted};font-size:13px;width:140px;vertical-align:top;">
        ${label}
      </td>
      <td style="padding:8px 0;color:${BRAND.text};font-size:13px;vertical-align:top;">
        ${valueHtml}
      </td>
    </tr>
  `;
}
