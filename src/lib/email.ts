// Brevo (Sendinblue) transactional email helper.
// Set in Vercel env vars:
//   BREVO_API_KEY      — required. From https://app.brevo.com/settings/keys/api
//   BREVO_SENDER_EMAIL — optional. Defaults to contact@abrahamssolicitors.co.uk
//                        (must be a verified sender in Brevo)
//   BREVO_SENDER_NAME  — optional. Defaults to "Abrahams Solicitors"
//   NOTIFY_EMAIL       — optional. Defaults to contact@abrahamssolicitors.co.uk
//   LEAD_COPY_EMAIL    — optional. Defaults to kazi2570@gmail.com (BCC).

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

type EmailPayload = {
  to: { email: string; name?: string }[];
  bcc?: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  replyTo?: { email: string; name?: string };
};

async function sendEmail(payload: EmailPayload): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return false;

  const sender = {
    email: process.env.BREVO_SENDER_EMAIL ?? "contact@abrahamssolicitors.co.uk",
    name: process.env.BREVO_SENDER_NAME ?? "Abrahams Solicitors",
  };

  try {
    const res = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ sender, ...payload }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type EnquiryData = {
  name?: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  source?: string;
  pageUrl?: string;
};

function internalHtml(d: EnquiryData): string {
  const rows = [
    ["Name", d.name],
    ["Email", d.email],
    ["Phone", d.phone],
    ["Service", d.service],
    ["Source", d.source],
    ["Page URL", d.pageUrl],
  ]
    .filter(([, v]) => v && String(v).trim().length > 0)
    .map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#64748b;font-size:13px;vertical-align:top;">${k}</td><td style="padding:6px 0;color:#0f172a;font-size:14px;font-weight:600;">${escapeHtml(String(v))}</td></tr>`)
    .join("");

  const msg = d.message && d.message.trim()
    ? `<div style="margin-top:20px;padding:16px;background:#f8fafc;border-left:3px solid #dc2626;border-radius:6px;"><p style="margin:0 0 6px;font-size:12px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Message</p><p style="margin:0;color:#0f172a;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(d.message)}</p></div>`
    : "";

  return `<!doctype html><html><body style="margin:0;padding:0;background:#f8f9fc;font-family:-apple-system,Segoe UI,Roboto,Helvetica,sans-serif;">
<div style="max-width:600px;margin:20px auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e8ecf0;">
  <div style="background:#0f172a;padding:24px 32px;">
    <p style="margin:0 0 4px;color:#f59e0b;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">New Website Enquiry</p>
    <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800;">Abrahams Solicitors</h1>
  </div>
  <div style="padding:24px 32px;">
    <table style="width:100%;border-collapse:collapse;">${rows}</table>
    ${msg}
    <p style="margin:24px 0 0;font-size:12px;color:#94a3b8;">Submitted at ${new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })} · Sent automatically from abrahamssolicitors.co.uk</p>
  </div>
</div>
</body></html>`;
}

function prospectHtml(d: EnquiryData): string {
  const greet = d.name ? `Hi ${escapeHtml(d.name.split(" ")[0])},` : "Hi there,";
  const serviceLine = d.service ? ` about <strong>${escapeHtml(d.service)}</strong>` : "";

  return `<!doctype html><html><body style="margin:0;padding:0;background:#f8f9fc;font-family:-apple-system,Segoe UI,Roboto,Helvetica,sans-serif;">
<div style="max-width:600px;margin:20px auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e8ecf0;">
  <div style="background:#0f172a;padding:24px 32px;">
    <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800;">Abrahams Solicitors</h1>
    <p style="margin:4px 0 0;color:#94a3b8;font-size:13px;">SRA regulated · Firm #809071</p>
  </div>
  <div style="padding:28px 32px;color:#0f172a;line-height:1.65;font-size:15px;">
    <p style="margin:0 0 16px;">${greet}</p>
    <p style="margin:0 0 16px;">Thanks for getting in touch${serviceLine}. We&rsquo;ve received your enquiry and a qualified solicitor will be calling you <strong>within the hour</strong> from an <strong>0203 number</strong> to arrange your free consultation — please keep your phone to hand.</p>
    <p style="margin:0 0 16px;">If you&rsquo;d prefer to reach us first, use any of the options below:</p>
    <p style="margin:0 0 24px;">
      <a href="tel:02033559823" style="display:inline-block;padding:12px 22px;background:#dc2626;color:#fff;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px;letter-spacing:0.02em;">📞 0203 355 9823</a>
      <a href="https://wa.me/447476548311" style="display:inline-block;margin-left:8px;padding:12px 22px;background:#25D366;color:#fff;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px;">WhatsApp us</a>
    </p>
    <div style="padding:16px 20px;background:#f8fafc;border-radius:10px;margin:0 0 22px;">
      <p style="margin:0 0 6px;font-size:12px;color:#64748b;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">What happens next</p>
      <ol style="margin:0;padding:0 0 0 18px;color:#334155;font-size:14px;line-height:1.7;">
        <li>Expect a call from a <strong>0203 number</strong> within the hour — that&rsquo;s us.</li>
        <li>We&rsquo;ll book a 30-minute consultation (phone, video or in-person) at a time that suits you.</li>
        <li>You&rsquo;ll get an honest assessment of your case and a fixed-fee quote if you decide to proceed.</li>
      </ol>
    </div>
    <p style="margin:0 0 4px;font-size:13px;color:#64748b;">Office hours: Mon–Fri 9:00am – 5:00pm</p>
    <p style="margin:0 0 16px;font-size:13px;color:#64748b;">New enquiries monitored 24 hours.</p>
    <hr style="border:none;border-top:1px solid #e8ecf0;margin:24px 0;" />
    <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">
      <strong>Abrahams (Yorkshire) Limited</strong><br />
      London: Suite 10, Atlas House, 1 King Street, London EC2V 8AU<br />
      Bradford: Unit 20, Listerhills Science Park, Campus Road, Bradford BD7 1HR<br />
      Authorised and regulated by the Solicitors Regulation Authority (firm #809071).
    </p>
  </div>
</div>
</body></html>`;
}

/**
 * Fired when /api/lead successfully accepts a submission BUT the SalesHub
 * webhook push fails (5xx, network error, or unparseable response). Without
 * this alert the failure is silent — the lead lands in the PublishOS mirror
 * but never reaches the CRM, and you only find out when the prospect
 * follows up days later.
 *
 * Sent to NOTIFY_EMAIL + LEAD_COPY_EMAIL so the duty solicitor sees it
 * within minutes and can replay the lead manually via /api/lead?debug=1
 * or push into SalesHub through the UI.
 *
 * Triggered by the Daniel Moreschi incident — 2026-06-01 10:58:55Z.
 */
export async function sendSyncFailureAlert(
  data: EnquiryData,
  context: {
    mirrorId: string;
    saleshubStatus?: number | null;
    saleshubResponsePreview?: string;
    saleshubError?: string;
  },
): Promise<boolean> {
  const notify = process.env.NOTIFY_EMAIL ?? "contact@abrahamssolicitors.co.uk";
  const leadCopyEmail = process.env.LEAD_COPY_EMAIL ?? "kazi2570@gmail.com";

  const subjectLabel = data.name || data.email || "unknown";
  const subject = `🚨 SALESHUB SYNC FAILED — ${subjectLabel} (lead landed in backup mirror only)`;

  const ctxRows = [
    ["Mirror id", context.mirrorId],
    ["SalesHub HTTP status", context.saleshubStatus != null ? String(context.saleshubStatus) : "(no response — network/timeout)"],
    ["SalesHub response", context.saleshubResponsePreview ?? "(empty)"],
    ["SalesHub error", context.saleshubError ?? "(none)"],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;font-weight:700;border-bottom:1px solid #e8ecf0;">${escapeHtml(k)}</td><td style="padding:6px 12px;color:#0f172a;font-size:13px;border-bottom:1px solid #e8ecf0;"><code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;">${escapeHtml(v)}</code></td></tr>`,
    )
    .join("");

  const leadRows = [
    ["Name", data.name ?? "(none)"],
    ["Email", data.email],
    ["Phone", data.phone ?? "(none)"],
    ["Service", data.service ?? "(none)"],
    ["Source", data.source ?? "(none)"],
    ["Page URL", data.pageUrl ?? "(none)"],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;font-weight:700;">${escapeHtml(k)}</td><td style="padding:6px 12px;color:#0f172a;font-size:13px;">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  const messageBlock = data.message
    ? `<div style="margin-top:18px;padding:16px 20px;background:#f8fafc;border-radius:10px;border:1px solid #e8ecf0;"><p style="margin:0 0 6px;font-size:12px;color:#64748b;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">Original message</p><p style="margin:0;color:#334155;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.message)}</p></div>`
    : "";

  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#f8f9fc;font-family:-apple-system,Segoe UI,Roboto,Helvetica,sans-serif;">
<div style="max-width:680px;margin:20px auto;background:#fff;border-radius:14px;overflow:hidden;border:2px solid #b91c1c;">
  <div style="background:#b91c1c;padding:18px 28px;">
    <p style="margin:0;color:#fef2f2;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">⚠️ Operations alert · Abrahams Solicitors</p>
    <h1 style="margin:6px 0 0;color:#fff;font-size:22px;font-weight:800;">SalesHub sync failed for a real lead</h1>
  </div>
  <div style="padding:24px 28px;color:#0f172a;line-height:1.6;font-size:14px;">
    <p style="margin:0 0 14px;"><strong>What this means:</strong> /api/lead received a valid enquiry, wrote it to the PublishOS backup mirror, and sent the auto-responder &mdash; but the push to SalesHub Cloud failed. The prospect is <strong>not yet in your CRM workflow</strong>. They got a "we'll call within the hour" email and may be waiting.</p>
    <p style="margin:0 0 14px;"><strong>What to do:</strong> open the lead below in the PublishOS dashboard or replay it via <code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;">POST /api/lead?debug=1</code> with <code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;">source="<prev>-recovery"</code>. SalesHub may already be healthy &mdash; the failure was likely transient.</p>
    <p style="margin:18px 0 6px;font-size:11px;color:#64748b;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Lead</p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e8ecf0;border-radius:8px;overflow:hidden;">${leadRows}</table>
    ${messageBlock}
    <p style="margin:18px 0 6px;font-size:11px;color:#64748b;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">SalesHub failure context</p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e8ecf0;border-radius:8px;overflow:hidden;">${ctxRows}</table>
    <p style="margin:24px 0 0;font-size:12px;color:#64748b;">This alert fires automatically from <code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;">src/app/api/lead/route.ts</code> when the SalesHub webhook returns a non-2xx response or throws. Configured by the LEAD_COPY_EMAIL and NOTIFY_EMAIL env vars.</p>
  </div>
</div>
</body></html>`;

  return sendEmail({
    to: [{ email: notify, name: "Abrahams Solicitors Ops" }],
    bcc: leadCopyEmail ? [{ email: leadCopyEmail, name: "Lead Copy" }] : undefined,
    subject,
    htmlContent: html,
  });
}

export async function sendEnquiryEmails(data: EnquiryData): Promise<{ internal: boolean; prospect: boolean }> {
  const notify = process.env.NOTIFY_EMAIL ?? "contact@abrahamssolicitors.co.uk";

  // Lead-copy recipient — every web lead is BCC'd here for monitoring.
  // Set LEAD_COPY_EMAIL in Vercel env to override; defaults to kazi2570@gmail.com.
  const leadCopyEmail = process.env.LEAD_COPY_EMAIL ?? "kazi2570@gmail.com";

  const results = await Promise.all([
    sendEmail({
      to: [{ email: notify, name: "Abrahams Solicitors" }],
      bcc: leadCopyEmail
        ? [{ email: leadCopyEmail, name: "Lead Copy" }]
        : undefined,
      subject: `🔔 New enquiry${data.service ? `: ${data.service}` : ""} — ${data.name ?? data.email}`,
      htmlContent: internalHtml(data),
      replyTo: data.email ? { email: data.email, name: data.name } : undefined,
    }),
    data.email
      ? sendEmail({
          to: [{ email: data.email, name: data.name }],
          subject: "We've received your enquiry — Abrahams Solicitors",
          htmlContent: prospectHtml(data),
          replyTo: { email: notify, name: "Abrahams Solicitors" },
        })
      : Promise.resolve(false),
  ]);

  return { internal: results[0], prospect: results[1] };
}
