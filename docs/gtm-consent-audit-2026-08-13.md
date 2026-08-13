# GTM Consent Audit + Fix Playbook — abrahamssolicitors.co.uk

**Container:** `GTM-MPNJCTN7`
**Access:** GTM UI at https://tagmanager.google.com (needs the Google account with edit rights on GTM-MPNJCTN7 — likely `uk.ppc.online.marketing@gmail.com` per prior notes)
**Estimated time:** 20-30 min click-through + one publish
**Prerequisites:** the companion site-side PR that ships Consent Mode v2 dataLayer signals from the cookie banner (see "Site-side prerequisite" section at bottom)

---

## Audit findings (2026-08-13, fresh browser session)

Trackers observed firing on the very first page load of `/immigration-solicitors/` with **no consent given**:

| # | Tracker | Loaded from | Class | Consent required? |
|---|---|---|---|---|
| 1 | **Google Tag Manager** | `googletagmanager.com/gtm.js?id=GTM-MPNJCTN7` | Container | No (GTM itself is a loader; consent applies to what it fires) |
| 2 | **PostHog (duplicate)** | `eu-assets.i.posthog.com/*` + `eu-assets.../array/phc_.../config.js` | Analytics + session-replay | **Yes** |
| 3 | **Microsoft Clarity** | `scripts.clarity.ms/0.8.69/clarity.js` + `www.clarity.ms/tag/umvk4x29kl` | Session-replay | **Yes** |
| 4 | **Meta Pixel** | `connect.facebook.net/en_US/fbevents.js` | Ad pixel | **Yes** |
| 5 | **TikTok Pixel** | `analytics.tiktok.com/i18n/pixel/*` | Ad pixel | **Yes** (also: intentional?) |
| 6 | **Bing UET** | `bat.bing.com/bat.js` + `bat.bing.com/p/action/187225876.js` | Ad pixel | **Consent Mode v2 partial** (can run in modelled/anonymous mode without consent) |
| 7 | **Google Ads** | (fired via GTM tag AW-17750102452) | Conversion tag | **Consent Mode v2 partial** (same) |
| 8 | **GA4** | (fired via GTM) | Analytics | **Consent Mode v2 partial** |

**The React-side PostHog provider is fine** — as of PR #10 it dynamic-imports and consent-gates correctly. The problem is a **second PostHog install via GTM** that runs unconditionally, plus the ad + analytics pixels.

---

## Playbook — step by step

### Step 0: back up first

1. GTM → Admin → **Export Container** → save the JSON. If anything goes wrong, Admin → Import Container restores the pre-change state.
2. Also: the Versions tab keeps every publish. Anything we publish here can be rolled back with one click.

### Step 1: identify + delete the duplicate PostHog GTM tag

1. Left nav → **Tags**
2. Look for any tag whose name contains "PostHog" OR whose type is "Custom HTML" containing a `posthog.init(` snippet, OR whose type is "Custom HTML" with a `<script src="https://eu.i.posthog.com/*">` or similar
3. If found:
   - Click the tag → note its name for the change log
   - Click ⋮ (top-right of the edit panel) → **Delete**
   - Confirm delete
4. If NOT found: check **Templates** for a community PostHog tag template, and check **Variables** for anything with `phc_` or a PostHog project key — sometimes PostHog is loaded via a Custom HTML tag stored under a non-obvious name

### Step 2: import the Consent Mode v2 defaults template

If the container doesn't already have a Consent Initialization tag:

1. Left nav → **Tags** → **New**
2. **Tag Type**: "Consent Mode (Google tags)" (built-in as of 2024) — if not visible, search Templates gallery for "Google Consent Mode"
3. **Configure the default consent state** — set ALL categories to `denied` (this is the "assume no consent until proven otherwise" posture):
   ```
   ad_storage: denied
   ad_user_data: denied
   ad_personalization: denied
   analytics_storage: denied
   functionality_storage: granted    ← required for basic UX
   personalization_storage: denied
   security_storage: granted         ← always granted, security-required
   wait_for_update: 500              ← ms — gives our banner time to signal
   ```
4. **Trigger**: "Consent Initialization - All Pages" (built-in trigger; if not present, create as trigger type "Consent Initialization" firing on All Pages)
5. Save

### Step 3: create the "Consent Accepted" custom trigger

1. Left nav → **Triggers** → **New**
2. **Trigger name**: "Cookie Consent Accepted"
3. **Trigger Type**: Custom Event
4. **Event name** (exact): `abrahams_consent_accepted`
5. **Fire on**: All Custom Events
6. Save

*(This event will be pushed to dataLayer by the cookie banner via the site-side PR — see prerequisite section.)*

### Step 4: gate the consent-required tags on the new trigger

For **each** of these tags — Meta Pixel, TikTok Pixel, Microsoft Clarity — do:

1. Tags → click the tag → **Triggering**
2. Delete the existing "All Pages" trigger
3. Add the "Cookie Consent Accepted" trigger created in Step 3
4. Save

Also for **each** tag, in **Advanced Settings → Consent Settings**, tick:
   - **Requires additional consent**: `ad_storage` (for Meta + TikTok) or `analytics_storage` (for Clarity)

### Step 5: keep ad conversion tags — configure them for Consent Mode

Google Ads + Bing UET conversion tags should NOT be gated on the manual "Cookie Consent Accepted" trigger, because Consent Mode v2 supports **cookieless pings** — modelled conversion attribution works even without consent. Ripping them out entirely loses ad attribution.

For **each** of these tags — Google Ads Conversion, Google Ads Remarketing, Bing UET, GA4 Configuration:

1. Tags → click the tag → **Advanced Settings → Consent Settings**
2. Set **Consent Settings**: "Requires additional consent for tag to fire"
3. Add consent types the tag needs (Google Ads: `ad_storage` + `ad_user_data`; GA4: `analytics_storage`)
4. Trigger stays as "All Pages"

The tag will now:
- Fire in cookieless/modelled mode when consent is denied (still attributes conversions to Google Ads campaigns via aggregated modelling)
- Fire in full mode when consent is granted

### Step 6: publish + version-label

1. Top-right → **Submit**
2. **Version name**: `Consent Mode v2 rollout + duplicate PostHog removal`
3. **Version description**: paste the summary of every tag changed
4. Publish

---

## Verification (after publish)

Do these in a **fresh incognito window** (or use the MCP browser tab — clear localStorage first):

1. **Pre-consent load**
   - Open `https://www.abrahamssolicitors.co.uk/immigration-solicitors/`
   - DevTools → Network → filter `posthog|clarity|tiktok|facebook|bing`
   - **Expected**: `bat.bing.com/bat.js` (Bing UET in cookieless mode) may still appear, GTM's `gtm.js` will appear
   - **NOT expected**: `eu-assets.i.posthog.com`, `scripts.clarity.ms`, `connect.facebook.net`, `analytics.tiktok.com`
2. **Accept cookie banner** on the page
3. **Post-consent load** — DevTools → Network
   - **Expected now**: PostHog (via /ingest), Clarity, Meta Pixel, TikTok Pixel all fire
4. **Reload page** with cookie accepted
   - Expected: all trackers fire from page load (consent persisted)
5. **Ping me** and I'll re-run the automated browser check to confirm

---

## Site-side prerequisite (Consent Mode v2 dataLayer wiring)

For any of this to work, the cookie banner needs to push consent state to `dataLayer` so GTM's Consent Initialization tag can pick it up. This is a small code change I'll ship as a separate PR ahead of you executing the GTM playbook.

Expected `dataLayer` writes from the banner:

```js
// On banner load, immediately (before user interaction):
window.dataLayer.push({
  event: 'default_consent',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
});

// On user clicking "Accept":
window.dataLayer.push({
  event: 'abrahams_consent_accepted',
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  analytics_storage: 'granted',
});

// On user clicking "Reject":
window.dataLayer.push({
  event: 'abrahams_consent_rejected',
  // (leave all storage denied — Consent Mode v2 still allows modelled conversions)
});
```

This code goes into the existing `src/components/v6/cookie-consent.tsx` (or wherever the banner lives) — I'll write it as PR #11 with a preview URL you can eyeball before merging.

---

## Rollback

- **Any single tag change**: GTM → Tags → click the tag → Version history icon → revert to prior version
- **Full container rollback**: GTM → Versions → find the pre-fix version → **Publish this version**
- Rollback is instant (< 1 min propagation).

---

## Open question for Imran (before executing Step 4)

- **TikTok Pixel**: do we actually have an active TikTok Ads campaign? If no → delete the tag entirely instead of gating it. If yes → gate as described.
