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

  const apiKey = process.env.SALESHUB_API_KEY;

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
