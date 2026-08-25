"use client";

// Client control rendered under an <h2 id="preferences"> on
// /cookie-policy/. Clicking it clears the stored consent decision and
// the Complianz-shim cookies, then reloads. The banner reappears fresh.
//
// SRA Transparency + PECR: withdrawal must be as easy as giving consent.
// A "clear browser storage manually" instruction (the pre-2026-08 wording)
// did not meet that bar — this button does.

const COOKIE_KEY = "abrahams-cookie-consent-v1";
const CMPLZ_COOKIES = ["cmplz_marketing", "cmplz_statistics", "cmplz_functional", "cmplz_preferences"] as const;

function reset() {
  try {
    window.localStorage.removeItem(COOKIE_KEY);
  } catch {}
  const expired = "Thu, 01 Jan 1970 00:00:00 GMT";
  for (const name of CMPLZ_COOKIES) {
    document.cookie = `${name}=;expires=${expired};path=/;SameSite=Lax`;
  }
  // Reload so any already-loaded trackers are dropped; the banner is
  // set to visible on mount when the stored decision is absent.
  window.location.reload();
}

export function CookiePreferencesControl() {
  return (
    <div className="not-prose mt-4 rounded-2xl ring-1 ring-slate-200 bg-slate-50 p-5 sm:p-6">
      <p className="text-sm text-slate-600 leading-relaxed mb-4">
        Click the button below to clear your current cookie choices and reopen the banner. Rejecting
        is as easy as accepting.
      </p>
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center rounded-lg bg-brand-red hover:bg-brand-red-dark text-white text-sm font-bold h-10 px-5 transition-colors"
      >
        Change my cookie choices
      </button>
    </div>
  );
}
