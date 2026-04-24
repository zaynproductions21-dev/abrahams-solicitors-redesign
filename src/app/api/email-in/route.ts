import { NextRequest, NextResponse } from "next/server";
import { sendEnquiryEmails } from "@/lib/email";

// Inbound email -> Abrahams -> SalesHub + Brevo auto-responder.
//
// Zapier / SendGrid Inbound Parse / Mailgun / Make can POST here. We accept
// the common field names from each service (see extract()). The handler:
//   1. Parses sender email + name + subject + body
//   2. Fires the same auto-responder + internal notification as a webform
//      submission, so the sender gets the "call within the hour" email
//   3. Forwards the payload on to SalesHub's email-ingest webhook if
//      SALESHUB_EMAIL_INGEST_URL is set, so SalesHub still creates the lead
//   4. Mirrors a record into abrahams_enquiries for belt-and-braces
//
// Required env:
//   BREVO_API_KEY                (already set — used by /api/lead)
// Optional env:
//   SALESHUB_EMAIL_INGEST_URL    full URL from SalesHub's "Email Forwarding"
//                                card. If unset we skip the forward.

const PUBLISHOS_DB = "https://publishos-eosin.vercel.app/api/db/abrahams_enquiries";

type ParsedEmail = {
  from_name: string;
  from_email: string;
  subject: string;
  body: string;
};

// Pull from name / from email / subject / body out of whatever shape the
// upstream service sends. Covers SendGrid Inbound Parse, Mailgun, Zapier,
// Make, and our own `{ from, subject, text }` if someone hand-rolls it.
function extract(body: Record<string, unknown>): ParsedEmail {
  const pick = (...keys: string[]) => {
    for (const k of keys) {
      const v = body[k];
      if (typeof v === "string" && v.trim()) return v.trim();
    }
    return "";
  };

  const rawFrom = pick("from", "From", "sender", "Sender", "from_email");
  // "Alice Someone <alice@example.com>" or just "alice@example.com"
  const emailMatch = rawFrom.match(/([^\s<>"]+@[^\s<>"]+)/);
  const from_email = emailMatch ? emailMatch[1].toLowerCase() : "";
  const nameMatch = rawFrom.match(/^(.*?)\s*<[^>]+>/);
  const from_name = (nameMatch ? nameMatch[1] : pick("from_name", "name", "sender_name"))
    .replace(/^["']|["']$/g, "")
    .trim();

  const subject = pick("subject", "Subject", "Message-Subject");
  const body_text = pick("text", "body-plain", "body_plain", "body", "message", "html", "body-html", "stripped-text");

  return { from_name, from_email, subject, body: body_text };
}

async function mirrorToPublishOS(payload: Record<string, unknown>) {
  try {
    const res = await fetch(PUBLISHOS_DB, { cache: "no-store" });
    const existing = res.ok ? await res.json() : [];
    const updated = [
      ...(Array.isArray(existing) ? existing : []),
      { id: crypto.randomUUID(), submitted_at: new Date().toISOString(), ...payload },
    ];
    await fetch(PUBLISHOS_DB, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
  } catch {}
}

async function forwardToSalesHub(original: unknown) {
  const url = process.env.SALESHUB_EMAIL_INGEST_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(original),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const raw = await req.json().catch(() => ({}));
  const email = extract(raw as Record<string, unknown>);

  if (!email.from_email) {
    return NextResponse.json({ success: false, error: "no_sender_email" }, { status: 400 });
  }

  // 1. Forward upstream to SalesHub so the lead still gets ingested there.
  const saleshub = await forwardToSalesHub(raw);

  // 2. Send auto-responder to the sender + internal notification to info@.
  const emails = await sendEnquiryEmails({
    name: email.from_name || undefined,
    email: email.from_email,
    service: email.subject || undefined,
    message: email.body,
    source: "email_forward",
  }).catch(() => ({ internal: false, prospect: false }));

  // 3. Backup so nothing is lost if both SalesHub and Brevo are down.
  await mirrorToPublishOS({
    source: "email_forward",
    name: email.from_name,
    email: email.from_email,
    subject: email.subject,
    message: email.body,
  });

  return NextResponse.json({
    success: true,
    saleshub,
    notify: emails.internal,
    auto_responder: emails.prospect,
    parsed: { from_email: email.from_email, subject: email.subject },
  });
}

export async function GET() {
  // Handy health check.
  return NextResponse.json({ ok: true, endpoint: "abrahams-email-in", accepts: "POST application/json" });
}
