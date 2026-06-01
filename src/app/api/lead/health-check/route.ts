/**
 * Daily lead-pipeline health-check.
 *
 * GET /api/lead/health-check (intended target for a Vercel Cron job — runs
 * once a day, ~09:00 UK time).
 *
 * What it does:
 *   1. Pulls the last 24 hours of enquiries from BOTH PublishOS mirror
 *      collections (immigration + housing-disrepair).
 *   2. Counts how many are flagged saleshub_synced: false (silent CRM
 *      failures), how many lack the flag (legacy rows before the audit
 *      column shipped), and how many synced cleanly.
 *   3. Sends a daily summary email to NOTIFY_EMAIL + LEAD_COPY_EMAIL. The
 *      first 24h of email might be noisy as old rows without the flag
 *      surface — that's fine, they pre-date the audit column.
 *
 * Auth: protected by the optional CRON_SECRET env var. Vercel Cron sends
 * the secret in the Authorization header automatically. Without it the
 * endpoint refuses anonymous requests.
 *
 * Added 2026-06-01 after the Daniel Moreschi incident.
 */

import { NextRequest, NextResponse } from "next/server";

const PUBLISHOS_DB_IMMIGRATION = "https://publishos-eosin.vercel.app/api/db/abrahams_enquiries";
const PUBLISHOS_DB_HOUSING = "https://publishos-eosin.vercel.app/api/db/abrahams_housing_enquiries";
const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

type EnquiryRow = {
  id: string;
  submitted_at?: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  source?: string;
  serviceLine?: string;
  pageUrl?: string;
  saleshub_synced?: boolean;
  saleshub_status?: number | null;
  saleshub_error?: string;
};

async function fetchCollection(url: string): Promise<EnquiryRow[]> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function esc(s: string | undefined): string {
  return (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function rowName(r: EnquiryRow): string {
  return [r.firstName, r.lastName].filter(Boolean).join(" ") || r.email || "(no name)";
}

export async function GET(req: NextRequest) {
  // Auth guard — Vercel Cron sends `Authorization: Bearer <CRON_SECRET>`.
  // If CRON_SECRET is set, require it. If not set (dev), allow anonymous
  // but log a warning.
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization") || "";
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "unauthorised" }, { status: 401 });
    }
  }

  const cutoff = Date.now() - 24 * 60 * 60 * 1000; // 24 hours ago

  const [imm, hou] = await Promise.all([
    fetchCollection(PUBLISHOS_DB_IMMIGRATION),
    fetchCollection(PUBLISHOS_DB_HOUSING),
  ]);

  const all: (EnquiryRow & { _bucket: "immigration" | "housing" })[] = [
    ...imm.map((r) => ({ ...r, _bucket: "immigration" as const })),
    ...hou.map((r) => ({ ...r, _bucket: "housing" as const })),
  ];

  const recent = all.filter((r) => {
    const t = r.submitted_at ? new Date(r.submitted_at).getTime() : 0;
    return t >= cutoff;
  });

  const synced = recent.filter((r) => r.saleshub_synced === true);
  const failed = recent.filter((r) => r.saleshub_synced === false);
  const unknown = recent.filter((r) => r.saleshub_synced === undefined);

  // If everything is healthy, return a quiet 200 — only email on failures
  // or in the morning slot (~09:00 UTC). For now, always email so the
  // duty solicitor sees the rhythm.
  const status = failed.length > 0 ? "ATTENTION" : "OK";

  const rowHtml = (r: EnquiryRow) =>
    `<tr>
      <td style="padding:6px 10px;font-size:12px;color:#475569;">${esc(r.submitted_at?.slice(11, 19))}</td>
      <td style="padding:6px 10px;font-size:13px;">${esc(rowName(r))}</td>
      <td style="padding:6px 10px;font-size:12px;color:#475569;">${esc(r.email)}</td>
      <td style="padding:6px 10px;font-size:12px;color:#475569;">${esc(r.source)}</td>
      <td style="padding:6px 10px;font-size:11px;color:#64748b;"><code style="background:#f1f5f9;padding:1px 4px;border-radius:3px;">${esc(r.id)}</code></td>
      ${r.saleshub_synced === false ? `<td style="padding:6px 10px;font-size:11px;color:#b91c1c;font-weight:700;">HTTP ${r.saleshub_status ?? "?"} · ${esc(r.saleshub_error ?? "non-2xx")}</td>` : ""}
    </tr>`;

  const failedTable = failed.length
    ? `<h3 style="margin:24px 0 6px;color:#b91c1c;font-size:15px;">🚨 Silent CRM failures (${failed.length})</h3>
       <p style="margin:0 0 10px;font-size:13px;color:#7f1d1d;">These leads landed in the PublishOS mirror but SalesHub returned a non-2xx response. They need manual replay.</p>
       <table style="width:100%;border-collapse:collapse;border:1px solid #fecaca;">
         <thead><tr style="background:#fef2f2;">
           <th style="text-align:left;padding:6px 10px;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#7f1d1d;">Time</th>
           <th style="text-align:left;padding:6px 10px;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#7f1d1d;">Name</th>
           <th style="text-align:left;padding:6px 10px;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#7f1d1d;">Email</th>
           <th style="text-align:left;padding:6px 10px;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#7f1d1d;">Source</th>
           <th style="text-align:left;padding:6px 10px;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#7f1d1d;">Mirror ID</th>
           <th style="text-align:left;padding:6px 10px;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#7f1d1d;">SalesHub error</th>
         </tr></thead>
         <tbody>${failed.map(rowHtml).join("")}</tbody>
       </table>`
    : "";

  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#f8f9fc;font-family:-apple-system,Segoe UI,Roboto,Helvetica,sans-serif;">
<div style="max-width:780px;margin:20px auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid ${failed.length ? "#b91c1c" : "#e8ecf0"};">
  <div style="background:${failed.length ? "#b91c1c" : "#0f172a"};padding:18px 28px;">
    <p style="margin:0;color:${failed.length ? "#fef2f2" : "#94a3b8"};font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">${status} · Daily lead-pipeline report · Abrahams Solicitors</p>
    <h1 style="margin:6px 0 0;color:#fff;font-size:22px;font-weight:800;">${synced.length} synced · ${failed.length} failed · ${unknown.length} legacy</h1>
  </div>
  <div style="padding:24px 28px;color:#0f172a;line-height:1.6;font-size:14px;">
    <p style="margin:0 0 16px;">Last 24 hours of website enquiries across the immigration and housing-disrepair pipelines:</p>
    <table style="width:100%;border-collapse:collapse;margin-bottom:8px;">
      <tr>
        <td style="padding:8px 10px;font-size:14px;color:#0f172a;width:60%;">✅ Synced to SalesHub cleanly</td>
        <td style="padding:8px 10px;font-size:18px;color:#047857;font-weight:800;text-align:right;">${synced.length}</td>
      </tr>
      <tr>
        <td style="padding:8px 10px;font-size:14px;color:#0f172a;border-top:1px solid #e8ecf0;">🚨 Failed to reach SalesHub</td>
        <td style="padding:8px 10px;font-size:18px;color:${failed.length ? "#b91c1c" : "#64748b"};font-weight:800;text-align:right;border-top:1px solid #e8ecf0;">${failed.length}</td>
      </tr>
      <tr>
        <td style="padding:8px 10px;font-size:14px;color:#64748b;border-top:1px solid #e8ecf0;">📋 Legacy rows (no audit flag yet)</td>
        <td style="padding:8px 10px;font-size:18px;color:#64748b;font-weight:800;text-align:right;border-top:1px solid #e8ecf0;">${unknown.length}</td>
      </tr>
    </table>
    ${failedTable}
    <p style="margin:24px 0 0;font-size:12px;color:#64748b;">Generated by <code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;">GET /api/lead/health-check</code> · scheduled via Vercel Cron · audit flag introduced 2026-06-01.</p>
  </div>
</div>
</body></html>`;

  // Log a structured line to Vercel function output before we attempt the
  // email send — gives a server-side audit trail of every cron run, even
  // if Brevo is degraded and the email itself never lands.
  console.log("[lead/health-check]", JSON.stringify({
    window_hours: 24,
    status,
    synced: synced.length,
    failed: failed.length,
    legacy_unflagged: unknown.length,
    failed_ids: failed.map((r) => r.id),
  }));

  // Send via Brevo
  const brevoKey = process.env.BREVO_API_KEY;
  let mailSent = false;
  if (brevoKey) {
    const notify = process.env.NOTIFY_EMAIL ?? "contact@abrahamssolicitors.co.uk";
    const leadCopy = process.env.LEAD_COPY_EMAIL ?? "kazi2570@gmail.com";
    try {
      const res = await fetch(BREVO_ENDPOINT, {
        method: "POST",
        headers: { "api-key": brevoKey, "Content-Type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          sender: {
            email: process.env.BREVO_SENDER_EMAIL ?? "contact@abrahamssolicitors.co.uk",
            name: process.env.BREVO_SENDER_NAME ?? "Abrahams Solicitors",
          },
          to: [{ email: notify, name: "Abrahams Solicitors Ops" }],
          bcc: leadCopy ? [{ email: leadCopy, name: "Lead Copy" }] : undefined,
          subject: `${status === "ATTENTION" ? "🚨 " : "✅ "}Daily lead-pipeline report — ${synced.length} synced, ${failed.length} failed (${new Date().toISOString().slice(0, 10)})`,
          htmlContent: html,
        }),
      });
      mailSent = res.ok;
      if (!res.ok) {
        console.error("[lead/health-check] Brevo non-2xx", { status: res.status });
      }
    } catch (e) {
      console.error("[lead/health-check] Brevo fetch threw", e instanceof Error ? e.message : String(e));
      mailSent = false;
    }
  } else {
    console.warn("[lead/health-check] BREVO_API_KEY not set — skipping email send");
  }

  return NextResponse.json({
    ok: true,
    status,
    window_hours: 24,
    synced: synced.length,
    failed: failed.length,
    legacy_unflagged: unknown.length,
    failed_ids: failed.map((r) => r.id),
    email_sent: mailSent,
  });
}
