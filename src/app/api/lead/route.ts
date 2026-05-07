import { NextRequest, NextResponse } from "next/server";
import { isSpamSubmission } from "@/lib/spam";
import { sendEnquiryEmails } from "@/lib/email";

const SALESHUB_ENDPOINT = "https://app.saleshubcloud.com/api/webhook/form-submission";
const PUBLISHOS_DB = "https://publishos-eosin.vercel.app/api/db/abrahams_enquiries";

async function saveToPublishOS(payload: Record<string, unknown>) {
  try {
    const existingRes = await fetch(PUBLISHOS_DB, { cache: "no-store" });
    const existing = existingRes.ok ? await existingRes.json() : [];
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

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  // Silent spam rejection: return a 200 OK so bots don't know the submission was dropped.
  if (isSpamSubmission(body)) {
    return NextResponse.json({ success: true });
  }

  // Verify Cloudflare Turnstile token
  const turnstileToken = body["cf-turnstile-response"];
  if (!turnstileToken) {
    return NextResponse.json({ success: false, error: "Security check required" }, { status: 400 });
  }
  try {
    const tsRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET_KEY, response: turnstileToken }),
    });
    const tsData = await tsRes.json();
    if (!tsData.success) {
      return NextResponse.json({ success: true }); // Silent reject like spam
    }
  } catch {
    // If verification service is down, let it through (fail open)
  }

  const apiKey = process.env.SALESHUB_API_KEY;

  // Google Click IDs — captured client-side from ?gclid=/?gbraid=/?wbraid=
  // on landing and forwarded with each lead. SalesHub admins should create
  // a custom lead field named `gclid` to receive these for conversion upload.
  const gclid = typeof body.gclid === "string" ? body.gclid : "";
  const gbraid = typeof body.gbraid === "string" ? body.gbraid : "";
  const wbraid = typeof body.wbraid === "string" ? body.wbraid : "";

  const saleshubPayload = {
    firstName: body.firstName ?? body.name?.split(" ")[0] ?? "",
    lastName: body.lastName ?? body.name?.split(" ").slice(1).join(" ") ?? "",
    email: body.email ?? "",
    phone: body.phone ?? "",
    source: body.source ?? "website_form",
    subject: body.subject ?? body.service ?? "Website enquiry",
    serviceLine: body.serviceLine ?? body.service ?? "",
    message: body.message ?? body.case ?? "",
    pageUrl: body.pageUrl ?? "",
    ...(gclid ? { gclid } : {}),
    ...(gbraid ? { gbraid } : {}),
    ...(wbraid ? { wbraid } : {}),
  };

  const results = { saleshub: false, backup: false };

  if (apiKey) {
    try {
      const res = await fetch(SALESHUB_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-API-Key": apiKey },
        body: JSON.stringify(saleshubPayload),
      });
      results.saleshub = res.ok;
    } catch {}
  }

  await saveToPublishOS(saleshubPayload);
  results.backup = true;

  // Fire notification + auto-responder emails via Brevo in parallel
  // with the response — don't block the user on SMTP.
  const emailPromise = sendEnquiryEmails({
    name: body.name ?? `${saleshubPayload.firstName} ${saleshubPayload.lastName}`.trim(),
    email: saleshubPayload.email,
    phone: saleshubPayload.phone,
    service: saleshubPayload.serviceLine || saleshubPayload.subject,
    message: saleshubPayload.message,
    source: saleshubPayload.source,
    pageUrl: saleshubPayload.pageUrl,
  }).catch(() => ({ internal: false, prospect: false }));

  const emails = await emailPromise;
  return NextResponse.json({
    success: results.saleshub || results.backup,
    ...results,
    notify: emails.internal,
    auto_responder: emails.prospect,
  });
}
