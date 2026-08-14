# Privacy Policy + Cookie Policy update — Imran review

**Trigger:** GTM consent-audit findings (see `docs/gtm-consent-audit-2026-08-13.md`) plus post-publish tightening on Facebook Pixel, Microsoft Clarity, TikTok Pixel via Consent Mode v2. Current policies pre-date those changes and understate what actually runs on the site.

**Ask:** review both drafts below, mark up anything you'd word differently or don't want stated at all, and confirm the "last updated" date change from **24 April 2026** to the date of your sign-off.

**Sensitive line I want your specific view on:** *"You will not see behavioural ad pixels (Meta, TikTok, Bing) load until you accept — but Google Ads and Google Analytics will run in a limited, non-cookie, aggregated mode from your first visit so we can measure whether our ads and site are working, without identifying you."* This is technically true (Consent Mode v2's cookieless/modelled mode) but it might be more comfort than you want to give — I've included a strict-mode alternative wording below.

---

## Draft 1 — Privacy Policy (replace existing "Cookies" section on `/privacy-policy/`)

Existing text on the live page:

> **Cookies**
> See our [Cookie Policy](/cookie-policy/) for the full list of cookies used on this site and how to control them.

Proposed replacement:

> **Cookies and analytics**
>
> We use cookies and similar tracking technologies to run the site, understand how visitors use it, and measure the results of our advertising. Nothing that identifies you personally is set until you accept the cookie banner. Before you accept, only strictly necessary cookies run (session state and your consent choice); Google Ads and Google Analytics may load in a **limited, aggregated, cookie-less mode** so we can measure ad performance without identifying you — this is how Google's Consent Mode v2 works and it does not create a profile of your visit. Behavioural advertising pixels (Meta / Facebook, TikTok, Bing) and session-recording tools (Microsoft Clarity, PostHog) do not load at all until you accept.
>
> If you accept, cookies are set by us and by our tracking providers as listed in our [Cookie Policy](/cookie-policy/). If you decline, or later change your mind, the corresponding cookies are not set (or are cleared when the browser next closes). Session-recording tools mask form input values and personal text by default, so even if you accept we do not receive the actual text you type into consultation forms.
>
> Your consent choice is stored on your device in local storage (`abrahams-cookie-consent-v1`). To change it, clear that storage entry and reload the page — the banner will reappear.

**Strict-mode alternative** for the second sentence, if you'd rather NOT tell visitors that Google Ads / Analytics run pre-consent even in cookieless mode:

> Before you accept, only strictly necessary cookies run (session state and your consent choice). All advertising pixels, analytics tools and session-recording tools remain fully disabled until you accept.

*(The strict alternative is factually correct only if we also configure Google Ads and Google Analytics to be fully blocked pre-consent. Right now they're in Consent Mode v2 cookieless mode — which is the industry norm and preserves ad attribution — so the first version matches reality. Your call which framing goes on the site.)*

---

## Draft 2 — Cookie Policy update (replace the "Cookies we use" section on `/cookie-policy/`)

Existing "Cookies we use" section on the live page is under-inclusive — only mentions Google Analytics and Google Ads. Proposed full replacement:

> **Cookies we use**
>
> **Strictly necessary** *(set without asking; needed for the site to work or to remember your consent choice)*
>
> - `abrahams-cookie-consent-v1` — remembers your cookie consent choice so we don't keep asking. Stored in local storage, not shared.
> - `abrahams_gclid`, `abrahams_gbraid`, `abrahams_wbraid`, `abrahams_msclkid` — click identifiers from Google Ads and Microsoft Ads, used to attribute enquiries back to the ad you clicked. Set only if you arrived from an ad.
> - `abrahams_utm_source`, `abrahams_utm_medium`, `abrahams_utm_campaign`, `abrahams_utm_content`, `abrahams_utm_term` — campaign tags from ad platforms, used to attribute enquiries to the specific campaign, ad group and keyword you clicked.
> - `abrahams_traffic_source` — remembers which ad network you arrived from so we can show the right phone number for call tracking.
>
> **Analytics (limited mode without consent, full mode with consent)**
>
> These providers run in Google's Consent Mode v2. Without your consent they receive aggregated, non-identifying signals only, with no cookies stored on your device. With your consent they set cookies as listed:
>
> - **Google Analytics 4** — helps us understand which pages people visit and how they found us. Cookies: `_ga`, `_ga_7WFT79HX1N`, `_ga_RVNGLQ146F`.
> - **Google Ads** conversion tracking + remarketing — confirms whether ads led to enquiries; retargets past visitors on Google properties. Cookies: `_gcl_au`, `_gcl_ls`.
> - **Microsoft Advertising (Bing UET)** — same as Google Ads for our Microsoft campaigns. Cookies: `_uetsid`, `_uetvid`, `_uetmsclkid`.
>
> **Marketing / behavioural pixels (only with consent)**
>
> - **Meta / Facebook Pixel** — attributes leads and retargets past visitors on Facebook and Instagram. Cookies: `_fbp`, `_fbc`.
> - **TikTok Pixel** — attributes leads and retargets past visitors on TikTok. Cookies: `_ttp`, `_tt_enable_cookie`, `ttcsid`, `ttcsid_*`.
>
> **Session recording and product analytics (only with consent)**
>
> Both of these tools are configured to mask all form inputs and text at the DOM level, so even with your consent they do not receive the actual content you type into consultation forms or free-text case descriptions.
>
> - **Microsoft Clarity** — heatmaps and anonymised session recordings so we can spot where the site confuses visitors. Cookies: `_clck`, `_clsk`.
> - **PostHog** — product analytics on which parts of the site help visitors find their answer. Cookies: `ph_<project id>_posthog`. Loaded through our own domain so no third party sees your visits directly.
>
> **Third-party embedded content**
>
> Some pages embed content from third parties (our WhatsApp button, Google reviews, our Skeepers verified-reviews widget, our AI chat widget). These providers may set their own cookies when their content loads. We have no control over those cookies — please check each provider's own policy.

---

## Rationale for the changes

1. **Current policy under-states what runs.** Pre-audit the site was actually loading Facebook Pixel, TikTok Pixel, Microsoft Clarity and Bing UET pre-consent regardless of the banner. The published policy only mentioned Google Analytics and Google Ads — a mismatch between "what we say we do" and "what we do" is the exact SRA-facing risk the audit surfaced.
2. **Post-fix, the reality is: Meta / TikTok / Clarity / PostHog are all consent-gated; Google Ads and GA4 run in Consent Mode v2 (cookieless / modelled).** The new policy reflects that faithfully rather than pretending everything is off pre-consent.
3. **Session-recording masking** deserves an explicit sentence because for a legal firm this is exactly the class of concern a client would raise ("did you record what I typed about my case?").
4. **Click-ID and UTM cookies** are strictly necessary for attribution but they're first-party and set on every ad-referred visit — worth listing so we can point to them if anyone asks.

## Implementation

Once you sign off (or mark up), I'll:
1. Ship the new copy to `src/app/v6/privacy-policy/page.tsx` and `src/app/v6/cookie-policy/page.tsx`
2. Bump both `lastUpdated` dates to the day of your sign-off
3. Ship as a single PR with your redlines applied, preview URL for you to eyeball, then merge
4. Log the change in the firm compliance file (dated + reason: consent-audit remediation)

Estimated build time: 20 min once you're back with markup.

## Files being changed

- `src/app/v6/privacy-policy/page.tsx` — replace "Cookies" section
- `src/app/v6/cookie-policy/page.tsx` — replace "Cookies we use" section (also considering renaming "Analytics (only with consent)" heading to match the new nuance)
