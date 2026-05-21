"use client";

import Script from "next/script";

const UET_TAG_ID = "187225876";
const COOKIE_KEY = "abrahams-cookie-consent-v1";

/**
 * Microsoft Bing UET (Universal Event Tracking).
 *
 * Mirrors the google-tag-manager.tsx pattern:
 *   - Loads bat.js (Microsoft's tracking library) and initialises `uetq` queue
 *   - enableAutoSpaTracking fires pageLoad on Next.js route changes
 *     (without this, only the first page load would track)
 *   - Defaults ad_storage to denied for GDPR-safe posture
 *   - Replays stored cookie consent decision from the same CookieConsent
 *     banner that wires up GTM
 *
 * UET ID: 187225876 — tag name: abrahamssolicitors.co.uk (Bing Ads dashboard
 * → Conversions → UET tag). Tag status was "configured but not firing" before
 * this component shipped; with this loaded the Bing tag should start
 * receiving page-view + conversion events.
 *
 * After this lands you may also see UET fire via GTM if the GTM container has
 * a Microsoft Ads tag. If you spot duplicate events in Bing's Tag Helper, the
 * GTM-side tag should be removed (this code-level install is the source of
 * truth).
 */
export function BingUet() {
  return (
    <Script id="bing-uet" strategy="afterInteractive">
      {`
        (function(w,d,t,r,u){
          var f,n,i;
          w[u]=w[u]||[];
          f=function(){
            var o={ti:"${UET_TAG_ID}", enableAutoSpaTracking: true};
            o.q=w[u];
            w[u]=new UET(o);
            w[u].push("pageLoad");
          };
          n=d.createElement(t);n.src=r;n.async=1;
          n.onload=n.onreadystatechange=function(){
            var s=this.readyState;
            s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null);
          };
          i=d.getElementsByTagName(t)[0];i.parentNode.insertBefore(n,i);
        })(window,document,"script","//bat.bing.com/bat.js","uetq");

        // Consent Mode — deny ad_storage until we know the visitor's choice.
        // Pulls from the same cookie banner key as GTM so a single accept
        // covers both Google and Bing tags.
        try {
          var raw = localStorage.getItem('${COOKIE_KEY}');
          var granted = false;
          if (raw) {
            var parsed = JSON.parse(raw);
            granted = parsed && parsed.decision === 'accepted';
          }
          window.uetq = window.uetq || [];
          window.uetq.push('consent', 'default', {
            ad_storage: granted ? 'granted' : 'denied'
          });
        } catch (e) {}
      `}
    </Script>
  );
}

/**
 * Call from the cookie banner after Accept/Decline. Safe to call before
 * bat.js has loaded — uetq queues it.
 */
export function updateUetConsent(decision: "accepted" | "rejected") {
  if (typeof window === "undefined") return;
  const granted = decision === "accepted" ? "granted" : "denied";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as unknown as { uetq?: unknown[] };
  w.uetq = w.uetq || [];
  w.uetq.push("consent", "update", { ad_storage: granted });
}
