import { NextRequest, NextResponse } from "next/server";
import { isSpamSubmission } from "@/lib/spam";
import { sendEnquiryEmails, sendSyncFailureAlert } from "@/lib/email";

const SALESHUB_ENDPOINT = "https://app.saleshubcloud.com/api/webhook/form-submission";
const PUBLISHOS_DB_IMMIGRATION = "https://publishos-eosin.vercel.app/api/db/abrahams_enquiries";
const PUBLISHOS_DB_HOUSING = "https://publishos-eosin.vercel.app/api/db/abrahams_housing_enquiries";

/**
 * Mirror the lead into PublishOS Redis. Housing-disrepair sources go into a
 * SEPARATE collection so the housing offline-conversion pipeline can join
 * GCLIDs → CRM stages without crossing signals with immigration. The two
 * pipelines have different CPAs, different case-fee profiles, and feed
 * different Google Ads conversion actions.
 */
async function saveToPublishOS(
  payload: Record<string, unknown>,
  saleshubLeadId: string | undefined,
  isHousingDisrepair: boolean,
  saleshubSyncContext: {
    synced: boolean;
    status?: number | null;
    error?: string;
  },
): Promise<string> {
  const id = saleshubLeadId && saleshubLeadId.trim()
    ? saleshubLeadId.trim()
    : crypto.randomUUID();
  const url = isHousingDisrepair ? PUBLISHOS_DB_HOUSING : PUBLISHOS_DB_IMMIGRATION;
  try {
    const existingRes = await fetch(url, { cache: "no-store" });
    const existing = existingRes.ok ? await existingRes.json() : [];
    const updated = [
      ...(Array.isArray(existing) ? existing : []),
      {
        id,
        submitted_at: new Date().toISOString(),
        ...payload,
        // Audit metadata — added 2026-06-01 after the Daniel Moreschi
        // incident. Makes orphan detection trivial: any mirror row with
        // saleshub_synced === false never reached the CRM.
        saleshub_synced: saleshubSyncContext.synced,
        saleshub_status: saleshubSyncContext.status ?? null,
        ...(saleshubSyncContext.error ? { saleshub_error: saleshubSyncContext.error } : {}),
      },
    ];
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
  } catch {}
  // Always return the id we attempted to save under — even if the mirror
  // write itself failed — so the sync-failure alert email can include it
  // for the duty solicitor to look up later.
  return id;
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
  // both route to the housing org via the source prefix check below.
  //
  // ALSO route to housing when the service/serviceLine field is "housing"
  // even if the source string isn't a housing-disrepair-prefixed value —
  // catches the case where someone submits via /contact-us/ (which sends
  // source: "contact-us") and picks "Housing" from the service dropdown.
  // Identified 2026-06-02 from a real lead (Kerry Oliver) who submitted via
  // /housing-disrepair/ correctly on 30 May, then re-submitted via
  // /contact-us/ on 1 June with serviceLine:"housing" — the second
  // submission was mis-routed into the immigration mirror under the old
  // source-only check. Without this addition, every Housing-dropdown lead
  // from contact-us / wizard fallback forms ends up cross-contaminating
  // the immigration mirror.
  const sourceStr = typeof body.source === "string" ? body.source : "";
  const serviceStr = typeof body.service === "string" ? body.service.toLowerCase() : "";
  const serviceLineStr = typeof body.serviceLine === "string" ? body.serviceLine.toLowerCase() : "";
  const isHousingDisrepair =
    sourceStr.startsWith("housing-disrepair")
    || serviceStr === "housing"
    || serviceLineStr === "housing"
    || serviceLineStr.includes("housing disrepair");
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
  // Wizard-type tag: set by the wizard widgets so the CRM + offline-conversion
  // pipeline can join leads back to the originating wizard (ilr / citizenship /
  // spouse). Whitelist the values so a hostile client can't write arbitrary
  // strings into the CRM column.
  const wizardTypeRaw = typeof body.wizard_type === "string" ? body.wizard_type : "";
  const wizardType = ["ilr", "citizenship", "spouse", "skilled-worker"].includes(wizardTypeRaw)
    ? wizardTypeRaw
    : "";

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
    // Wizard tag goes under both the short name and a `source_wizard_type`
    // alias, matching the GCLID dual-write pattern — whichever column name
    // the SalesHub webhook handler reads, the value lands.
    ...(wizardType ? { wizard_type: wizardType, source_wizard_type: wizardType } : {}),
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

  const saleshubStatus = typeof saleshubDebug.status === "number" ? saleshubDebug.status : null;
  const saleshubError = typeof saleshubDebug.fetch_error === "string"
    ? saleshubDebug.fetch_error
    : (typeof saleshubDebug.json_parse_error === "string" ? saleshubDebug.json_parse_error : undefined);
  const mirrorId = await saveToPublishOS(
    saleshubPayload,
    saleshubLeadId,
    isHousingDisrepair,
    { synced: results.saleshub, status: saleshubStatus, error: saleshubError },
  );
  results.backup = true;

  // Silent-failure safeguard: when an API key WAS configured (so SalesHub
  // was expected to succeed) but the push failed, fire an alert email to
  // the duty solicitor so the lead isn't silently lost. Without this the
  // failure surfaces only when the prospect chases — by which point the
  // "we'll call within the hour" auto-responder is hours old.
  //
  // Added 2026-06-01 after the Daniel Moreschi incident (mirror id
  // 3d0cd7c1-1d04-4568-a3cb-33111d7b15b2 — SalesHub returned non-2xx at
  // 10:58 UTC and the lead was only recovered manually).
  if (apiKey && !results.saleshub) {
    const responsePreview = typeof saleshubDebug.response_preview === "string"
      ? saleshubDebug.response_preview
      : undefined;
    // Log to Vercel function output too — gives a server-side audit trail
    // even if the alert email itself fails to deliver.
    console.error("[lead] SalesHub sync failed", {
      mirrorId,
      saleshubStatus,
      saleshubError,
      source: saleshubPayload.source,
      email: saleshubPayload.email,
    });
    void sendSyncFailureAlert(
      {
        name: body.name ?? `${saleshubPayload.firstName} ${saleshubPayload.lastName}`.trim(),
        email: saleshubPayload.email,
        phone: saleshubPayload.phone,
        service: saleshubPayload.serviceLine || saleshubPayload.subject,
        message: saleshubPayload.message,
        source: saleshubPayload.source,
        pageUrl: saleshubPayload.pageUrl,
      },
      {
        mirrorId,
        saleshubStatus,
        saleshubResponsePreview: responsePreview,
        saleshubError,
      },
    ).catch((err) => {
      console.error("[lead] sendSyncFailureAlert failed", err);
    });
  }

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
