// Brevo (Sendinblue) transactional email helper.
// Set in Vercel env vars:
//   BREVO_API_KEY      — required. From https://app.brevo.com/settings/keys/api
//   BREVO_SENDER_EMAIL — optional. Defaults to contact@abrahamssolicitors.co.uk
//                        (must be a verified sender in Brevo)
//   BREVO_SENDER_NAME  — optional. Defaults to "Abrahams Solicitors"
//   NOTIFY_EMAIL       — optional. Defaults to info@abrahamssolicitors.co.uk

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

type EmailPayload = {
  to: { email: string; name?: string }[];
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

export async function sendEnquiryEmails(data: EnquiryData): Promise<{ internal: boolean; prospect: boolean }> {
  const notify = process.env.NOTIFY_EMAIL ?? "info@abrahamssolicitors.co.uk";

  const results = await Promise.all([
    sendEmail({
      to: [{ email: notify, name: "Abrahams Solicitors" }],
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
