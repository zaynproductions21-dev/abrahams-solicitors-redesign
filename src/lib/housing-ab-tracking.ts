/**
 * Housing-disrepair hero A/B — shared PostHog capture for the
 * dedicated `housing_disrepair_lead` conversion event.
 *
 * Called from HousingSimpleForm (hero form) and the exit-intent modal.
 * Both conversion paths feed the same PostHog event so the experiment
 * metric (ID 108540, flag `housing-disrepair-hero-fill`) measures
 * total form-and-popup conversions per variant, not just the hero
 * form in isolation.
 *
 * Gated on existing cookie consent — if the visitor hasn't accepted
 * the cookie banner we silently do nothing (matches the rest of the
 * PostHog instrumentation on this site). The caller still submits
 * the lead to SalesHub; we just don't tag it in PostHog.
 */

const CONSENT_KEY = "abrahams-cookie-consent-v1";

export async function captureHousingDisrepairLead(opts: {
  variant?: string;
  landlord?: "council" | "ha" | null;
  postcode?: string | null;
  source: "simple-form" | "exit-intent";
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
    posthog.capture("housing_disrepair_lead", {
      variant: opts.variant ?? "unknown",
      landlord: opts.landlord ?? null,
      postcode_prefix:
        opts.postcode?.trim().split(" ")[0]?.toUpperCase() || null,
      lead_source: opts.source,
    });
  } catch {
    // posthog-js not yet loaded (consent granted but provider still
    // initialising) — the lead still reached SalesHub; we just don't
    // tag it. Acceptable given the rarity of the race.
  }
}
