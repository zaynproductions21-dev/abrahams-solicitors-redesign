import { NextRequest, NextResponse } from "next/server";
import { isSpamSubmission } from "@/lib/spam";
import { sendEnquiryEmails } from "@/lib/email";

const SALESHUB_ENDPOINT = "https://app.saleshubcloud.com/api/webhook/form-submission";
const PUBLISHOS_DB = "https://publishos-eosin.vercel.app/api/db/abrahams_enquiries";

async function saveToPublishOS(
  payload: Record<string, unknown>,
  saleshubLeadId?: string,
) {
  try {
    const existingRes = await fetch(PUBLISHOS_DB, { cache: "no-store" });
    const existing = existingRes.ok ? await existingRes.json() : [];
    // Prefer SalesHub's lead ID so the offline-conversion pipeline can join
    // by leadId directly. Fall back to a random UUID if SalesHub didn't
    // return one (e.g. SalesHub call failed or returned non-JSON).
    const id = saleshubLeadId && saleshubLeadId.trim()
      ? saleshubLeadId.trim()
      : crypto.randomUUID();
    const updated = [
      ...(Array.isArray(existing) ? existing : []),
      { id, submitted_at: new Date().toISOString(), ...payload },
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

  // Cloudflare Turnstile is rendered on /contact-us/ but NOT on the other v6
  // forms (homepage, free-consultation, the housing/PI/visa qualifiers, the
  // [slug] consultation form). Those forms rely on the honeypot + timestamp
  // spam guard above. So: when a Turnstile token IS provided, verify it; when
  // it is NOT provided, fall through to processing.
  const turnstileToken = body["cf-turnstile-response"];
  if (turnstileToken) {
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
      // Verification service unreachable — fail open. Spam guard already passed.
    }
  }

  // Per-source routing: housing-disrepair leads go to a separate org in
  // SalesHub Cloud (so Google Ads Smart Bidding for the housing campaign
  // never crosses signals with the existing immigration campaigns).
  // Sources `housing-disrepair-qualifier` and `housing-disrepair-exit-intent`
  // both route to the housing org; everything else (immigration, homepage,
  // service-page:*) continues to use the default key/org as before.
  const sourceStr = typeof body.source === "string" ? body.source : "";
  const isHousingDisrepair = sourceStr.startsWith("housing-disrepair");
  const apiKey = isHousingDisrepair
    ? process.env.SALESHUB_API_KEY_HOUSING
    : process.env.SALESHUB_API_KEY;

  // Click IDs — captured client-side from ?gclid=/?gbraid=/?wbraid= (Google)
  // and ?msclkid= (Bing) on landing and forwarded with each lead. SalesHub
  // admins should create custom lead fields `gclid` and `msclkid` to receive
  // these so offline conversions can be uploaded back to each ad network.
  const gclid = typeof body.gclid === "string" ? body.gclid : "";
  const gbraid = typeof body.gbraid === "string" ? body.gbraid : "";
  const wbraid = typeof body.wbraid === "string" ? body.wbraid : "";
  const msclkid = typeof body.msclkid === "string" ? body.msclkid : "";
  const trafficSource = typeof body.traffic_source === "string" ? body.traffic_source : "";

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
    // Click IDs sent under both the short legacy name AND the SalesHub Cloud
    // canonical column name (`source_click_id`, `source_traffic_source`) so
    // whichever name the webhook handler reads, the value lands. Avoids the
    // silent-drop bug where GCLIDs were arriving at SalesHub but never being
    // mapped to the `source_click_id` column on the lead row.
    ...(gclid ? { gclid, source_click_id: gclid } : {}),
    ...(gbraid ? { gbraid } : {}),
    ...(wbraid ? { wbraid } : {}),
    ...(msclkid ? { msclkid } : {}),
    ...(trafficSource ? { traffic_source: trafficSource, source_traffic_source: trafficSource } : {}),
  };

  const results = { saleshub: false, backup: false };

  // POST to SalesHub and capture the lead ID it assigns. That ID must end
  // up as the PublishOS mirror's `id` so the offline-conversion pipeline
  // can join the two systems by leadId directly. SalesHub's response shape
  // isn't fixed long-term so we look at several common keys defensively.
  let saleshubLeadId: string | undefined;
  let saleshubDebug: Record<string, unknown> = {};
  if (apiKey) {
    try {
      const res = await fetch(SALESHUB_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-API-Key": apiKey },
        body: JSON.stringify(saleshubPayload),
      });
      results.saleshub = res.ok;
      saleshubDebug = { status: res.status };
      if (res.ok) {
        try {
          const data = await res.json();
          saleshubDebug = {
            ...saleshubDebug,
            response_keys: data && typeof data === "object" ? Object.keys(data) : null,
            // Echo back the first 250 chars of the response for inspection (safe — webhook returns IDs/status only)
            response_preview: JSON.stringify(data).slice(0, 250),
          };
          // Try common field names — first non-empty wins
          const candidate =
            data?.leadId ?? data?.lead_id ?? data?.enquiryId ?? data?.enquiry_id ??
            data?.id ?? data?.data?.leadId ?? data?.data?.id;
          if (typeof candidate === "string" && candidate.trim()) {
            saleshubLeadId = candidate.trim();
          }
        } catch (e) {
          saleshubDebug = { ...saleshubDebug, json_parse_error: e instanceof Error ? e.message : String(e) };
        }
      }
    } catch (e) {
      saleshubDebug = { fetch_error: e instanceof Error ? e.message : String(e) };
    }
  }

  await saveToPublishOS(saleshubPayload, saleshubLeadId);
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
  // Include diagnostic info if ?debug=1 is set so we can see what SalesHub returned.
  const url = new URL(req.url);
  const debug = url.searchParams.get("debug") === "1";
  return NextResponse.json({
    success: results.saleshub || results.backup,
    ...results,
    notify: emails.internal,
    auto_responder: emails.prospect,
    ...(debug ? {
      _debug: {
        saleshub: saleshubDebug,
        saleshubLeadIdCaptured: saleshubLeadId ?? null,
      },
    } : {}),
  });
}
