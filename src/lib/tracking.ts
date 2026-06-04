// Google Ads Enhanced Conversions / GA4 form submission tracking.
// Fires dataLayer event `ec_form_submit` with unhashed email + E.164 phone
// (Google's GTM template hashes server-side) plus all captured click IDs
// (gclid / gbraid / wbraid / msclkid) and the resolved traffic source so
// the GTM Google Ads + Microsoft Ads conversion tags can read directly
// off the dataLayer.

import { getStoredGclid, getTrafficSource } from "@/lib/gclid";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

// Normalise a free-text phone input to E.164.
// Returns null if we can't confidently produce a valid E.164 number.
export function toE164(raw: string, defaultCountry: "+44" = "+44"): string | null {
  if (!raw) return null;
  const digits = raw.replace(/[^\d+]/g, "");
  let candidate = digits;
  if (candidate.startsWith("00")) candidate = "+" + candidate.slice(2);
  if (!candidate.startsWith("+")) {
    if (candidate.startsWith("44") && candidate.length >= 11) {
      candidate = "+" + candidate;
    } else if (candidate.startsWith("0")) {
      candidate = defaultCountry + candidate.slice(1);
    } else {
      candidate = defaultCountry + candidate;
    }
  }
  const body = candidate.slice(1);
  if (!/^\d{10,15}$/.test(body)) return null;
  return candidate;
}

export function pushWhatsAppClick(): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  const { gclid, gbraid, wbraid, msclkid } = getStoredGclid();
  const traffic_source = getTrafficSource();

  // Fire dataLayer event (GTM passthrough for any existing tags)
  window.dataLayer.push({
    event: "whatsapp_click",
    traffic_source,
    ...(gclid ? { gclid } : {}),
    ...(gbraid ? { gbraid } : {}),
    ...(wbraid ? { wbraid } : {}),
    ...(msclkid ? { msclkid } : {}),
  });

  // Fire Google Ads conversion directly — AW-17750102452/xv2GCK2B67gcELSj9I9C
  // "WhatsApp Click" conversion action (value £24, Primary, CONTACT category)
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === "function") {
    w.gtag("event", "conversion", {
      send_to: "AW-17750102452/xv2GCK2B67gcELSj9I9C",
      value: 24.0,
      currency: "GBP",
    });
  }
}

export function pushFormSubmit({
  email,
  phone,
}: {
  email?: string;
  phone?: string;
}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  const user_data: Record<string, string> = {};
  if (email) user_data.email = email.trim();
  if (phone) {
    const normalised = toE164(phone);
    if (normalised) user_data.phone_number = normalised;
  }

  // Pull the persisted click IDs (Google + Bing) so the GTM conversion
  // tags for each network can attach them to the conversion event, and
  // the resolved traffic source for any per-source routing.
  const { gclid, gbraid, wbraid, msclkid } = getStoredGclid();
  const traffic_source = getTrafficSource();

  // lp_variant: identifies which Immigration Solicitors LP variant the
  // submission came from. Used to split CPA / CVR by A/B variant in
  // GA4 + Looker Studio. Undefined on every other page (omitted).
  // Spec: docs/abrahams-immigration-solicitors-ab-spec-2026-06-03.md
  let lp_variant: "canonical" | "direct" | undefined = undefined;
  if (typeof window !== "undefined") {
    const p = window.location.pathname;
    if (p === "/immigration-solicitors-direct" || p === "/immigration-solicitors-direct/") {
      lp_variant = "direct";
    } else if (p === "/immigration-solicitors" || p === "/immigration-solicitors/") {
      lp_variant = "canonical";
    }
  }

  window.dataLayer.push({
    event: "ec_form_submit",
    user_data,
    traffic_source,
    ...(gclid ? { gclid } : {}),
    ...(gbraid ? { gbraid } : {}),
    ...(wbraid ? { wbraid } : {}),
    ...(msclkid ? { msclkid } : {}),
    ...(lp_variant ? { lp_variant } : {}),
  });
}
