// Click-ID capture + retrieval for paid-traffic attribution.
//
// On any v6 page paid traffic lands on, the URL will carry one of:
//   gclid   — Google Ads
//   gbraid  — Google Ads (iOS, no third-party cookies)
//   wbraid  — Google Ads (Android, no third-party cookies)
//   msclkid — Microsoft/Bing Ads
//
// We persist each one for 90 days in a cookie + a localStorage mirror,
// then attach the relevant value to every lead form submission so the
// SalesHub CRM can store it against the lead. That gives us the round
// trip for offline conversion upload back to Google Ads / Bing Ads.

export const GCLID_COOKIE = "abrahams_gclid";
export const GBRAID_COOKIE = "abrahams_gbraid";
export const WBRAID_COOKIE = "abrahams_wbraid";
export const MSCLKID_COOKIE = "abrahams_msclkid";
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

type Identifier = "gclid" | "gbraid" | "wbraid" | "msclkid";

const COOKIE_MAP: Record<Identifier, string> = {
  gclid: GCLID_COOKIE,
  gbraid: GBRAID_COOKIE,
  wbraid: WBRAID_COOKIE,
  msclkid: MSCLKID_COOKIE,
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
      }
    }
  });

  // An answer engine never sends a click ID, so it is only identifiable from
  // the referrer (or the utm_source some of them tag). Checked only when no
  // paid click was captured, so advertising attribution is never overwritten,
  // and only stamped once so the first touch wins for the cookie's lifetime.
  if (!capturedSource && !readCookie(TRAFFIC_SOURCE_COOKIE)) {
    const ai =
      classifyAiUtmSource(params.get("utm_source")) ??
      classifyAiReferrer(
        typeof document !== "undefined" ? document.referrer : "",
        typeof window !== "undefined" ? window.location.hostname : undefined,
      );
    if (ai) capturedSource = ai;
  }

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

/** Single best Google identifier — gclid wins, then gbraid, then wbraid. */
export function getBestClickId(): string | null {
  const { gclid, gbraid, wbraid } = getStoredGclid();
  return gclid || gbraid || wbraid || null;
}

/**
 * Answer engines do not pass a click ID, so before this existed every visit
 * arriving from ChatGPT, Perplexity, Gemini, Copilot or Claude was recorded as
 * "direct" — indistinguishable from someone typing the URL. The GEO audit
 * counted 104 AI sessions and attributed 100% of them to ChatGPT, which is not
 * a finding about ChatGPT so much as a finding about the only engine anything
 * was managing to name.
 */
export type AiReferrer =
  | "chatgpt"
  | "perplexity"
  | "gemini"
  | "copilot"
  | "claude"
  | "ai-other";

export type TrafficSource = "google" | "bing" | AiReferrer | "direct";

/**
 * Host → source. Matched against the referrer's hostname with an exact or
 * suffix match, so "www.perplexity.ai" and "perplexity.ai" both resolve and a
 * lookalike domain ending in something else does not.
 *
 * Microsoft is the awkward one: copilot.microsoft.com is Copilot, but Copilot
 * also answers at bing.com/chat, which shares a host with Bing search. That
 * case is separated by path below rather than by host.
 */
const AI_REFERRER_HOSTS: ReadonlyArray<readonly [string, AiReferrer]> = [
  ["chatgpt.com", "chatgpt"],
  ["chat.openai.com", "chatgpt"],
  ["openai.com", "chatgpt"],
  ["perplexity.ai", "perplexity"],
  ["gemini.google.com", "gemini"],
  ["bard.google.com", "gemini"],
  ["copilot.microsoft.com", "copilot"],
  ["claude.ai", "claude"],
];

/**
 * Resolve an answer engine from a referrer URL. Exported so the classification
 * can be unit-tested and reused server-side without duplicating the list.
 * Returns null when the referrer is absent, same-origin, or not an AI engine —
 * never a guess.
 */
export function classifyAiReferrer(referrer: string, currentHost?: string): AiReferrer | null {
  if (!referrer) return null;
  let url: URL;
  try {
    url = new URL(referrer);
  } catch {
    return null;
  }
  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  if (currentHost && host === currentHost.toLowerCase().replace(/^www\./, "")) return null;

  // Copilot shares bing.com with Bing search; only the chat path is Copilot.
  if (host === "bing.com") {
    return url.pathname.toLowerCase().startsWith("/chat") ? "copilot" : null;
  }

  for (const [needle, source] of AI_REFERRER_HOSTS) {
    if (host === needle || host.endsWith("." + needle)) return source;
  }
  return null;
}

/**
 * Some engines also tag the outbound link (ChatGPT sends utm_source=chatgpt.com).
 * That survives a referrer-stripping browser, so it is checked as well.
 */
function classifyAiUtmSource(utmSource: string | null): AiReferrer | null {
  if (!utmSource) return null;
  const v = utmSource.toLowerCase();
  for (const [needle, source] of AI_REFERRER_HOSTS) {
    if (v === needle || v === needle.split(".")[0]) return source;
  }
  if (v === "bing.com/chat" || v === "copilot") return "copilot";
  return null;
}

/** Reads the traffic-source cookie; falls back to inspecting click-id cookies. */
const VALID_SOURCES: ReadonlySet<string> = new Set<TrafficSource>([
  "google", "bing", "chatgpt", "perplexity", "gemini", "copilot", "claude", "ai-other", "direct",
]);

export function getTrafficSource(): TrafficSource {
  const stamped = readCookie(TRAFFIC_SOURCE_COOKIE);
  if (stamped && stamped !== "direct" && VALID_SOURCES.has(stamped)) return stamped as TrafficSource;
  // A paid click still outranks anything stamped from a referrer: the click ID
  // is explicit, the referrer is inferred.
  const { gclid, gbraid, wbraid, msclkid } = getStoredGclid();
  if (msclkid) return "bing";
  if (gclid || gbraid || wbraid) return "google";
  return "direct";
}
