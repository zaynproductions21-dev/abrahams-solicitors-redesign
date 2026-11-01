/**
 * Emergency-immigration shared PostHog capture for the dedicated
 * `emergency_immigration_lead` conversion event.
 *
 * Fired from the hero urgent-callback form, from each of the three
 * scenario sub-page forms (visa-expired, detention, removal-directions),
 * from the "Not sure?" triage form, and from tap-to-call anchors so
 * the Google Ads conversion action gets both call AND form signal.
 *
 * Mirrors src/lib/housing-ab-tracking.ts — consent-gated, dynamic
 * posthog-js import, swallows errors so a Twilio/Brevo/analytics
 * hiccup never blocks the actual lead POST to /api/lead.
 */

const CONSENT_KEY = "abrahams-cookie-consent-v1";

export type EmergencyLeadSource =
  | "hero-form"
  | "visa-expired-form"
  | "detention-form"
  | "removal-directions-form"
  | "triage-form"
  | "tap-to-call"
  | "tap-to-whatsapp";

export async function captureEmergencyImmigrationLead(opts: {
  variant?: string;
  situation?: string | null;
  source: EmergencyLeadSource;
}): Promise<void> {
  if (typeof window === "undefined") return;
  let consented = false;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (raw) consented = JSON.parse(raw)?.decision === "accepted";
  } catch {
    return;
  }
  if (!consented) return;
  try {
    const { default: posthog } = await import("posthog-js");
    if (!posthog.__loaded) return;
    posthog.capture("emergency_immigration_lead", {
      variant: opts.variant ?? "unknown",
      situation: opts.situation ?? null,
      lead_source: opts.source,
    });
  } catch {
    // Posthog not ready yet (consent granted but provider still
    // initialising) — the lead still reaches SalesHub; we just don't
    // tag it. Acceptable given the rarity of the race.
  }
}
