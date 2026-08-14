# Mobile perf + consent-gating lessons — apply to every publishos site

**Written:** 2026-08-14 after full audit + fix cycle on abrahamssolicitors.co.uk.
**Purpose:** hand this to the next session running a "PostHog / GTM / mobile perf" sweep across all 12+ Zayn Productions sites, so they don't re-learn the same lessons.

---

## The five findings, ranked by portability × impact

### 1. PostHog is statically imported everywhere — biggest single win, applies to every site
- Every site using `posthog-js` via a `PostHogProvider` React component almost certainly has `import posthog from 'posthog-js'` at the top of the file. That's a **~189 KiB webpack chunk** bundled into first-load JS regardless of whether the user ever consents.
- Fix: convert to `await import('posthog-js')` inside `initPostHog()`, ONLY called after consent event fires. See `src/components/posthog-provider.tsx` on this repo for the reference implementation (PR #10, commit `6bf2f2a`).
- **Measured impact:** first-load JS on `/immigration-solicitors/` went from 939 KiB → 755 KiB (**-184 KiB, -19.6%**).
- **Cost:** ~15 min per site. Type-safe with `any` for the client — don't bother threading types from `posthog-js` (they change between versions).
- **Where to look:** `grep -r 'from .posthog-js' src/` on every site. Every match is a candidate.
- **Sites likely affected:** immigrationlawyersuk, searchforjobs, crimechecker, weddinvites, taxsimplifier, ashraf-estate-agent, topdesserts, ukhousingdisrepairsolicitors, rosewood-design-samples, jeffersonclarke-site, publishos itself.

### 2. Consent Mode v2 site-side wiring is easy to get RIGHT and easy to leave BROKEN
- Correct pattern (already in this repo — see `src/components/v6/google-tag-manager.tsx`):
  1. Bootstrap `dataLayer` + `gtag` BEFORE GTM loads via a `beforeInteractive` script
  2. `gtag('consent', 'default', {ad_storage:'denied', analytics_storage:'denied', ...})` immediately
  3. Replay any stored decision from `localStorage` also before GTM loads
  4. On banner accept/reject, call `gtag('consent', 'update', {...})` from the banner component
- **Common failure mode:** the site is properly wired but the GTM container inherits legacy tags from an old CMS (WordPress + Complianz plugin) that expect DIFFERENT event names or cookie names. Even though the site sends correct consent-mode signals, the tags themselves ignore them.
- On this repo the "Consent Mode - Update" GTM tag was wired to `cmplz-*` click classes from WordPress Complianz plugin — never fired on Next.js site. Fix in commit `a5829ea` (PR #11) writes the four `cmplz_*` cookies from the site + pushes `event: 'consentUpdated'` to match GTM's existing expectations.
- **Where to look on other sites:** each site's GTM container Variables list. If you see `1st Party Cookie - cmplz_marketing` variables — that container was ported from a WP site and needs the shim.

### 3. GTM's "Require additional consent for tag to fire" does NOT block Custom HTML tags reliably
- **Tested here on 2026-08-14: DIDN'T WORK for Facebook Pixel, TikTok Pixel, Microsoft Clarity even though Consent Mode default was `denied`.** Tags fired and set cookies pre-consent.
- Google's docs say it should block. My theory: works for template tags (like the built-in Google Ads and GA4 templates), fails for Custom HTML tags that inject their own `<script>` inline.
- **Working fallback:** don't rely on "Require additional consent". Instead, **change the tag's trigger from "All Pages" to a Custom Event trigger listening for `cookie_consent_granted`** (an event the site pushes on banner accept).
- **Cost:** one trigger creation (already exists in Abrahams container: `Custom Event - cookie_consent_granted`) + one tag edit per tag (~2 min each).
- **On the Abrahams container this is the pending fallback**; execute if the current Consent Settings approach continues to leak. Not a repeat mistake on other sites — use the trigger-swap approach from the start.

### 4. Third-party embedded widgets can bypass GTM entirely
- The Abrahams site has an "AI chat widget" (`div id="ai-chat-widget-host-695bd22f35932d4b85fe954c"`) that loads independently of GTM and may bring its own Facebook Pixel / TikTok / Clarity scripts.
- **Any widget you embed from an external SaaS** (chat, reviews, calendars, form-builders) is a black-box tracker source. GTM can't gate what it loads.
- **Where to look:** grep every site's layout / global components for `<script src="...">` tags loading third-party widgets. Anything that isn't controlled by our GTM container is an audit gap.
- **Fix:** for each embedded widget, either (a) confirm the vendor honors GDPR consent mode, (b) delay-load the widget until consent, or (c) drop it.

### 5. Next.js 16 + Turbopack: bundle analysis tooling changed
- `@next/bundle-analyzer` **does not produce HTML treemap output** with Turbopack (tested on 2026-08-14). It installs cleanly, wraps the config, but no `.next/analyze/*.html` files get generated.
- What DOES work: **`.next/diagnostics/route-bundle-stats.json`** — Next.js's built-in per-route bundle stats. Contains `route`, `firstLoadUncompressedJsBytes`, and `firstLoadChunkPaths` per route.
- Recipe for finding bundle hotspots on any Next 16 site:
  1. `npm run build`
  2. `python3 -c "import json; s=json.load(open('.next/diagnostics/route-bundle-stats.json')); [print(f\"{e['firstLoadUncompressedJsBytes']/1024:7.1f} KiB {e['route']}\") for e in sorted(s, key=lambda e:-e['firstLoadUncompressedJsBytes'])[:20]]"`
  3. `ls -la .next/static/chunks/*.js | sort -k5 -rn | head -10` — largest chunks on disk
  4. For each chunk, `grep -l 'posthog\|clarity\|facebook\|tiktok' .next/static/chunks/*.js` to identify vendor code
- **Don't waste time installing @next/bundle-analyzer on Next 16 sites** — it doesn't work with turbopack; use the built-in stats.

---

## The one non-portable finding

**Static-render sweep is a red herring.** Every v6 page on Abrahams shows `x-nextjs-prerender: 1` — they are ALREADY statically prerendered. The `cache-control: max-age=0, must-revalidate` header is Next.js's DEFAULT for prerendered pages and doesn't mean anything's dynamic. Don't be misled if another audit report calls it out. Real perf work is in JS bundle size (see #1 + #5), not in caching model.

---

## Recommended sweep order

For each site, in priority order:

1. **PostHog lazy-load PR** — 15 min, universal win, no user-visible change. Ship on every site with `posthog-js` in `package.json`.
2. **Route-bundle-stats.json scan** — 5 min, identifies whether the site has other bloat (icons libraries not tree-shaken, duplicate React copies, oversized 3rd-party SDKs).
3. **GTM audit** — 30 min per site if the site has a GTM container. Check for: legacy WP Complianz variables, "All Pages" triggers on marketing pixels, embedded chat widgets, third-party pixels not in GTM.
4. **Consent Mode v2 wiring** — check every site's cookie banner writes `gtag('consent', 'default', denied)` before GTM loads AND pushes `cookie_consent_granted` on accept. If not, port the pattern from `src/components/v6/google-tag-manager.tsx` + `src/components/v6/cookie-consent.tsx`.
5. **Third-party widget audit** — grep for embedded SaaS widgets, check each for tracker bundling.

## Reference implementations in this repo (Abrahams)

- Consent-gated PostHog dynamic import: `src/components/v6/posthog-provider.tsx` (PR #10, commit `6bf2f2a`)
- Site-side Complianz-shim cookies + `consentUpdated` event: `src/components/v6/cookie-consent.tsx` (PR #11, commit `a5829ea`)
- Consent Mode v2 bootstrap: `src/components/v6/google-tag-manager.tsx`
- Policy pages reflecting reality: `src/app/v6/privacy-policy/page.tsx` + `src/app/v6/cookie-policy/page.tsx` (PR #13, commit `a896c87`)

## Estimated total cost for the full sweep

- **12 sites × 15 min PostHog fix** = 3 hours
- **12 sites × 5 min bundle scan** = 1 hour
- **Sites with GTM (probably 4-6): × 30 min** = 2-3 hours
- **Consent Mode v2 audit (may already be done via publishos rollout)**: 15 min per site = 3 hours
- **Third-party widget audit**: 10 min per site = 2 hours

**Total: 11-12 hours** if all sites need every fix. In practice most sites will only need the PostHog fix (fastest lever, biggest per-site win).

**Fastest ROI**: just ship the PostHog dynamic-import to every site with `posthog-js` installed, skip the deeper audits unless a specific site is flagged for perf issues in Google Ads landing-page reports. That alone is a ~5 PageSpeed-point uplift on every affected site with zero risk.
