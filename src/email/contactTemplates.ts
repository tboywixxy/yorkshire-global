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

const SERVICE_LABELS: Record<string, string> = {
  managedIT: "Managed IT",
  secureAI: "Secure AI",
  ssdlc: "SSDLC",
  cybersecurity: "Cybersecurity",
  businessAnalysis: "Business Analysis",
  projectManagement: "Project Management",
  strategy: "Strategy",
  other: "Other",
};

const BRAND = {
  pageBg: "#f6f7fb",
  cardBg: "#ffffff",
  border: "#e5e7eb",
  text: "#111827",
  muted: "#4b5563",
  subtle: "#6b7280",
  accent: "#2563eb",
};

function humanizeKey(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatServiceLabel(service: string) {
  return SERVICE_LABELS[service] || humanizeKey(service);
}

function displayText(value: string, fallback = "Not provided") {
  const trimmed = value.trim();
  return trimmed ? trimmed : fallback;
}

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
      @media screen and (max-width: 520px) {
        .container { width: 100% !important; }
        .stack { display: block !important; width: 100% !important; }
        .hide-sm { display: none !important; }
        .show-sm { display: block !important; }
        .center-sm { text-align: center !important; }
        .pad-sm { padding-left: 10px !important; padding-right: 10px !important; }
        .logo-sm { margin-left: auto !important; margin-right: auto !important; }
      }

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
            <tr>
              <td style="padding:0 0 12px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border:1px solid ${BRAND.border};">
                  <tr>
                    <td class="stack center-sm" align="left" style="padding:18px 20px;">
                      <img
                        src="cid:yorkshire_logo"
                        width="260"
                        alt="Yorkshire Global Consulting Inc."
                        class="logo-sm"
                        style="display:block;border:0;outline:none;text-decoration:none;max-width:260px;height:auto;"
                      />
                    </td>
                    <td class="hide-sm" align="right" style="padding:18px 20px;color:${BRAND.subtle};font-size:12px;vertical-align:middle;">
                      Ontario, Canada
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr class="show-sm">
              <td class="show-sm center-sm" style="padding:0 0 12px 0;color:${BRAND.subtle};font-size:12px;">
                Ontario, Canada
              </td>
            </tr>

            <tr>
              <td style="background:${BRAND.cardBg};border:1px solid ${BRAND.border};padding:20px;">
                ${bodyHtml}
              </td>
            </tr>

            <tr>
              <td style="padding:14px 6px 0 6px;color:${BRAND.subtle};font-size:12px;line-height:1.5;">
                &copy; ${new Date().getFullYear()} Yorkshire Global Consulting Inc.
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
  const serviceLabel = formatServiceLabel(p.service);
  const companyLabel = displayText(p.organization);
  const subject = `New Inquiry: ${serviceLabel} - ${companyLabel}`;
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
      ${row("Company", escapeHtml(companyLabel))}
      ${row("Service", escapeHtml(serviceLabel))}
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
    preheader: `New inquiry from ${p.fullName} (${companyLabel})`,
    bodyHtml,
  });

  const text =
    `New contact form submission\n\n` +
    `Full name: ${p.fullName}\n` +
    `Email: ${p.email}\n` +
    `Phone: ${p.phone}\n` +
    `Company: ${companyLabel}\n` +
    `Service: ${serviceLabel}\n\n` +
    `Message:\n${p.message}\n`;

  return { subject, html, text };
}

export function ackEmailTemplate(p: Pick<ContactPayload, "fullName" | "service" | "organization">) {
  const serviceLabel = formatServiceLabel(p.service);
  const companyLabel = displayText(p.organization);
  const subject = "We received your message";

  const bodyHtml = `
    <h1 style="margin:0 0 8px 0;color:${BRAND.text};font-size:18px;line-height:1.3;">
      Thanks - we got your message
    </h1>
    <p style="margin:0 0 14px 0;color:${BRAND.text};font-size:13px;line-height:1.7;">
      Hi <b style="color:${BRAND.text};">${escapeHtml(p.fullName)}</b>,<br/><br/>
      We've received your inquiry and will respond within <b style="color:${BRAND.text};">24 hours</b>.
    </p>

    <div style="background:#f9fafb;border:1px solid ${BRAND.border};padding:16px;">
      <div style="color:${BRAND.text};font-size:14px;font-weight:700;margin-bottom:12px;">Inquiry Summary</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        ${row("Contact", escapeHtml(p.fullName))}
        ${row("Service", escapeHtml(serviceLabel))}
        ${row("Company", escapeHtml(companyLabel))}
      </table>
    </div>

    <p style="margin:14px 0 0 0;color:${BRAND.subtle};font-size:12px;line-height:1.6;">
      Yorkshire Global Consulting Inc.
    </p>
  `;

  const html = shell({
    title: "We received your message",
    preheader: "Thanks - your message has been received.",
    bodyHtml,
  });

  const text =
    `Hi ${p.fullName},\n\n` +
    `We've received your inquiry and will respond within 24 hours.\n\n` +
    `Inquiry Summary:\n` +
    `Contact: ${p.fullName}\n` +
    `Service: ${serviceLabel}\n` +
    `Company: ${companyLabel}\n\n` +
    `- Yorkshire Global Consulting Inc.`;

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
