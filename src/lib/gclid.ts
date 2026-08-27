// Click-ID capture + retrieval for paid-traffic attribution.
//
// On any v6 page paid traffic lands on, the URL will carry one of:
//   gclid   — Google Ads
//   gbraid  — Google Ads (iOS, no third-party cookies)
//   wbraid  — Google Ads (Android, no third-party cookies)
//   msclkid — Microsoft/Bing Ads
//   fbclid  — Meta (Facebook/Instagram) Ads
//
// We persist each one for 90 days in a cookie + a localStorage mirror,
// then attach the relevant value to every lead form submission so the
// SalesHub CRM can store it against the lead. That gives us the round
// trip for offline conversion upload back to Google Ads / Bing Ads.

export const GCLID_COOKIE = "abrahams_gclid";
export const GBRAID_COOKIE = "abrahams_gbraid";
export const WBRAID_COOKIE = "abrahams_wbraid";
export const MSCLKID_COOKIE = "abrahams_msclkid";
export const FBCLID_COOKIE = "abrahams_fbclid";
/**
 * The assembled Meta click identifier: `fb.1.<clickTimeMs>.<fbclid>`.
 * Stored separately from the raw fbclid because the timestamp must be the
 * moment of the CLICK — reconstructing it at form-submit time (or worse, at
 * CRM-sync time, days later) degrades match quality. Meta's own pixel writes
 * the same value to a first-party `_fbc` cookie; we read that in preference
 * when it exists (see getStoredMetaIds).
 */
export const FBC_COOKIE = "abrahams_fbc";
export const TRAFFIC_SOURCE_COOKIE = "abrahams_traffic_source";
export const GCLID_LS_KEY = "abrahams.gclid";

// UTM parameters — captured alongside the click IDs. The Google Ads tracking
// template appends utm_source=google, utm_medium=cpc, utm_campaign={campaign.name},
// utm_content={adgroup.name}, utm_term={keyword} on every ad click so the
// SalesHub CRM can attribute a lead to the specific campaign / ad group / keyword.
export const UTM_SOURCE_COOKIE = "abrahams_utm_source";
export const UTM_MEDIUM_COOKIE = "abrahams_utm_medium";
export const UTM_CAMPAIGN_COOKIE = "abrahams_utm_campaign";
export const UTM_CONTENT_COOKIE = "abrahams_utm_content";
export const UTM_TERM_COOKIE = "abrahams_utm_term";

const TTL_DAYS = 90;

type Identifier = "gclid" | "gbraid" | "wbraid" | "msclkid" | "fbclid";

const COOKIE_MAP: Record<Identifier, string> = {
  gclid: GCLID_COOKIE,
  gbraid: GBRAID_COOKIE,
  wbraid: WBRAID_COOKIE,
  msclkid: MSCLKID_COOKIE,
  fbclid: FBCLID_COOKIE,
};

function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  // Lax is enough — gclid is not a credential and we want it readable on the
  // direct-navigation-after-ad-click path.
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

/** Reads the URL once on landing and persists any captured click IDs.
 *
 * Per Google's reference script (support.google.com/google-ads/answer/7012522)
 * we also validate `gclsrc`: if present, it must contain "aw" — this rejects
 * non-Ads gclids (e.g. older Google Analytics auto-tagging).
 *
 * We also stamp a single `traffic_source` cookie used by Dynamic Number
 * Insertion to pick which call-tracking number to display.
 */
export function captureGclidFromUrl(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);

  const gclsrc = params.get("gclsrc");
  const gclidValid = !gclsrc || gclsrc.indexOf("aw") !== -1;

  let capturedSource: TrafficSource | null = null;

  (Object.keys(COOKIE_MAP) as Identifier[]).forEach((key) => {
    if (key === "gclid" && !gclidValid) return;
    const value = params.get(key);
    if (value && value.length > 0 && value.length < 512) {
      setCookie(COOKIE_MAP[key], value, TTL_DAYS);
      if (key === "gclid") {
        try {
          window.localStorage.setItem(
            GCLID_LS_KEY,
            JSON.stringify({ value, ts: Date.now() + TTL_DAYS * 24 * 60 * 60 * 1000 })
          );
        } catch {}
        capturedSource = "google";
      } else if ((key === "gbraid" || key === "wbraid") && !capturedSource) {
        capturedSource = "google";
      } else if (key === "msclkid") {
        capturedSource = "bing";
      } else if (key === "fbclid") {
        // Build fbc at click time — see FBC_COOKIE.
        setCookie(FBC_COOKIE, `fb.1.${Date.now()}.${value}`, TTL_DAYS);
        // Google/Bing win if both are somehow present: a paid-search click ID
        // is the stronger attribution signal and drives the call-tracking
        // number swap, which Meta traffic has no equivalent of.
        if (!capturedSource) capturedSource = "meta";
      }
    }
  });

  if (capturedSource) {
    setCookie(TRAFFIC_SOURCE_COOKIE, capturedSource, TTL_DAYS);
  }

  // UTMs — persisted independently of click IDs. A referral-only visit
  // (organic UTM in an email or newsletter, no gclid/msclkid) still gets
  // stamped for attribution downstream. Same 90-day TTL as the click IDs.
  const UTM_MAP: Record<string, string> = {
    utm_source: UTM_SOURCE_COOKIE,
    utm_medium: UTM_MEDIUM_COOKIE,
    utm_campaign: UTM_CAMPAIGN_COOKIE,
    utm_content: UTM_CONTENT_COOKIE,
    utm_term: UTM_TERM_COOKIE,
  };
  Object.keys(UTM_MAP).forEach((key) => {
    const value = params.get(key);
    if (value && value.length > 0 && value.length < 512) {
      setCookie(UTM_MAP[key], value, TTL_DAYS);
    }
  });
}

/** Returns the most recently captured UTM parameters. */
export function getStoredUtms(): {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
} {
  return {
    utm_source: readCookie(UTM_SOURCE_COOKIE),
    utm_medium: readCookie(UTM_MEDIUM_COOKIE),
    utm_campaign: readCookie(UTM_CAMPAIGN_COOKIE),
    utm_content: readCookie(UTM_CONTENT_COOKIE),
    utm_term: readCookie(UTM_TERM_COOKIE),
  };
}

/** Returns the most recently captured click identifiers. */
export function getStoredGclid(): {
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  msclkid: string | null;
} {
  const gclid = readCookie(GCLID_COOKIE);
  const gbraid = readCookie(GBRAID_COOKIE);
  const wbraid = readCookie(WBRAID_COOKIE);
  const msclkid = readCookie(MSCLKID_COOKIE);
  return { gclid, gbraid, wbraid, msclkid };
}

/**
 * Meta click identifiers for this visitor.
 *
 * `fbc` prefers Meta's own first-party `_fbc` cookie (written by the Pixel when
 * it's loaded via GTM) because that one is authoritative; ours is the fallback
 * for visitors who landed before the Pixel fired or who block it.
 *
 * These travel with the lead to SalesHub so the Conversions API for CRM sync
 * can identify the person when there's no Meta lead_id (i.e. every website
 * form fill, as opposed to a Meta lead-ad submission).
 */
export function getStoredMetaIds(): { fbclid: string | null; fbc: string | null } {
  const fbclid = readCookie(FBCLID_COOKIE);
  const fbc = readCookie("_fbc") || readCookie(FBC_COOKIE);
  return { fbclid, fbc };
}

/** Single best Google identifier — gclid wins, then gbraid, then wbraid. */
export function getBestClickId(): string | null {
  const { gclid, gbraid, wbraid } = getStoredGclid();
  return gclid || gbraid || wbraid || null;
}

/**
 * "meta" deliberately has no dedicated call-tracking number — pickVariant in
 * dynamic-phone.tsx falls through to the default number for it. It exists so
 * lead rows and dataLayer events can distinguish paid-social from direct.
 */
export type TrafficSource = "google" | "bing" | "meta" | "direct";

/** Reads the traffic-source cookie; falls back to inspecting click-id cookies. */
export function getTrafficSource(): TrafficSource {
  const stamped = readCookie(TRAFFIC_SOURCE_COOKIE);
  if (stamped === "google" || stamped === "bing" || stamped === "meta") return stamped;
  const { gclid, gbraid, wbraid, msclkid } = getStoredGclid();
  if (msclkid) return "bing";
  if (gclid || gbraid || wbraid) return "google";
  if (readCookie(FBCLID_COOKIE)) return "meta";
  return "direct";
}
