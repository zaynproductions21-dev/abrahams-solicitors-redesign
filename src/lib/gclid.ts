// Google Click Identifier (GCLID) capture + retrieval.
//
// On any v6 page Google sends paid traffic to, the URL will carry ?gclid=...
// We persist it for 90 days (Google Ads click→conversion attribution window)
// in both a cookie and localStorage, then attach it to every lead form
// submission so the SalesHub CRM can store it against the lead and we can
// upload conversions back to Google Ads later.
//
// Also handles `gbraid` and `wbraid` — the iOS/Android equivalents Google
// emits when third-party cookies aren't available.

export const GCLID_COOKIE = "abrahams_gclid";
export const GBRAID_COOKIE = "abrahams_gbraid";
export const WBRAID_COOKIE = "abrahams_wbraid";
export const GCLID_LS_KEY = "abrahams.gclid";
const TTL_DAYS = 90;

type Identifier = "gclid" | "gbraid" | "wbraid";

const COOKIE_MAP: Record<Identifier, string> = {
  gclid: GCLID_COOKIE,
  gbraid: GBRAID_COOKIE,
  wbraid: WBRAID_COOKIE,
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

/** Reads the URL once on landing and persists any of gclid/gbraid/wbraid.
 *
 * Per Google's reference script (support.google.com/google-ads/answer/7012522)
 * we also validate `gclsrc`: if present, it must contain "aw" — this rejects
 * non-Ads gclids (e.g. older Google Analytics auto-tagging).
 */
export function captureGclidFromUrl(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);

  const gclsrc = params.get("gclsrc");
  const gclidValid = !gclsrc || gclsrc.indexOf("aw") !== -1;

  (Object.keys(COOKIE_MAP) as Identifier[]).forEach((key) => {
    // gclid is gated by gclsrc validation; gbraid/wbraid don't carry gclsrc.
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
      }
    }
  });
}

/** Returns the most recently captured gclid (or gbraid/wbraid fallback). */
export function getStoredGclid(): {
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
} {
  const gclid = readCookie(GCLID_COOKIE);
  const gbraid = readCookie(GBRAID_COOKIE);
  const wbraid = readCookie(WBRAID_COOKIE);
  return { gclid, gbraid, wbraid };
}

/** Single best identifier — gclid wins, then gbraid, then wbraid. */
export function getBestClickId(): string | null {
  const { gclid, gbraid, wbraid } = getStoredGclid();
  return gclid || gbraid || wbraid || null;
}
