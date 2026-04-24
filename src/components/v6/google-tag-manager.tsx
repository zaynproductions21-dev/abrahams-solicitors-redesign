"use client";

import Script from "next/script";

const GTM_ID = "GTM-MPNJCTN7";
const COOKIE_KEY = "abrahams-cookie-consent-v1";

// Read stored consent decision (if any) so we can set the correct Consent
// Mode v2 default *before* GTM loads. Anything we don't know = denied,
// which is the GDPR-safe posture.
function readStoredConsent(): "accepted" | "rejected" | null {
  try {
    const raw = window.localStorage.getItem(COOKIE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.decision === "accepted" ? "accepted" : parsed?.decision === "rejected" ? "rejected" : null;
  } catch {
    return null;
  }
}

/**
 * Google Tag Manager with Consent Mode v2.
 *
 *   - Initialises `dataLayer` and `gtag()` *before* GTM itself loads so any
 *     events pushed earlier in the page lifecycle aren't lost (ec_form_submit
 *     etc. from our tracking helpers).
 *   - Sets a Consent Mode v2 default block (everything denied except
 *     security_storage) so tags respect GDPR on first visit.
 *   - If the visitor already accepted/rejected cookies in a previous session,
 *     we apply that decision before GTM runs.
 *   - On subsequent consent changes (user clicks Accept / Decline in the
 *     CookieConsent banner) we call `gtag('consent', 'update', …)` from that
 *     component — no action needed here beyond making `gtag` globally available.
 */
export function GoogleTagManager() {
  return (
    <>
      {/* 1. Bootstrap dataLayer + gtag, set consent defaults, then load GTM */}
      <Script id="gtm-bootstrap" strategy="beforeInteractive">
        {`
          (function(){
            window.dataLayer = window.dataLayer || [];
            window.gtag = function gtag(){ window.dataLayer.push(arguments); };

            // Consent Mode v2 — default everything to denied until we know
            // the visitor's choice. 'wait_for_update' lets tags hold their
            // fire for up to 500ms waiting for the consent update.
            window.gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'granted',
              security_storage: 'granted',
              wait_for_update: 500
            });

            // If the visitor already decided last time, replay that decision.
            try {
              var raw = localStorage.getItem('${COOKIE_KEY}');
              if (raw) {
                var parsed = JSON.parse(raw);
                var granted = parsed && parsed.decision === 'accepted';
                window.gtag('consent', 'update', {
                  ad_storage: granted ? 'granted' : 'denied',
                  ad_user_data: granted ? 'granted' : 'denied',
                  ad_personalization: granted ? 'granted' : 'denied',
                  analytics_storage: granted ? 'granted' : 'denied'
                });
              }
            } catch (e) {}
          })();
        `}
      </Script>

      {/* 2. GTM container */}
      <Script id="gtm-loader" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),
              dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window, document, 'script', 'dataLayer', '${GTM_ID}');
        `}
      </Script>

      {/* 3. <noscript> fallback for users with JS disabled */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}

// Call this from the cookie banner after the user clicks Accept or Decline.
// Safe to call even before GTM has loaded — dataLayer queues it.
export function updateGtmConsent(decision: "accepted" | "rejected") {
  if (typeof window === "undefined") return;
  const granted = decision === "accepted" ? "granted" : "denied";
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "consent_update",
    // Also push via gtag() style so Consent Mode picks it up regardless.
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === "function") {
    w.gtag("consent", "update", {
      ad_storage: granted,
      ad_user_data: granted,
      ad_personalization: granted,
      analytics_storage: granted,
    });
  }
}

// silence unused import when localStorage not touched
void readStoredConsent;
