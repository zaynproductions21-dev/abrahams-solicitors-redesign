# Imran Shah — pre-consent tracking on abrahamssolicitors.co.uk (compliance heads-up)

**Status:** Ready to send. Attach: `docs/gtm-consent-audit-2026-08-13.md` (the playbook) if you want him to see the technical detail.

**Recommended subject:**
```
Compliance heads-up — third-party trackers firing before cookie consent (we're fixing)
```

## Email body (paste into Outlook / Gmail)

> Imran,
>
> Wanted to flag this before it becomes a problem rather than after. During a performance investigation on the immigration-solicitors landing page today I found that our cookie banner isn't actually gating what it claims to gate.
>
> **The finding.** On a fresh browser session with no consent yet given, six third-party trackers fire on the very first page load:
>
> 1. **PostHog** (product analytics + session-replay) — via a duplicate GTM tag pointing at `eu.i.posthog.com` (bypassing our own reverse-proxy). We already gate PostHog properly in our React code, but a second copy is being loaded by Google Tag Manager independently.
> 2. **Microsoft Clarity** (session-replay heatmaps) — same class of tracking as PostHog session replay.
> 3. **Meta / Facebook Pixel** (`connect.facebook.net/en_US/fbevents.js`).
> 4. **TikTok Pixel** (`analytics.tiktok.com`) — this one I want your view on separately; do we actually have a TikTok Ads account running that needs it? It's on the page but I'm not sure it's intentional.
> 5. **Bing UET** — conversion pixel for the Microsoft Ads campaign.
> 6. **Google Tag Manager itself** which fires all of the above.
>
> The cookie banner ("Accept / Reject" pop-up) shows on first visit, but its Accept/Reject clicks don't currently change the behaviour of any of the six trackers above — they all run either way.
>
> **Why this matters (in one paragraph, for the compliance file).** Under UK PECR + UK GDPR, any non-strictly-necessary cookie or tracking technology needs prior specific consent before it fires. Session-replay tools (PostHog + Clarity) and behavioural ad pixels (Meta, TikTok, Bing) are all in the "requires consent" category — the ICO has been increasingly clear about this since 2023. For a regulated law firm the risk isn't ICO enforcement (unlikely at our scale) but the reputational exposure of a mismatch between "we take your privacy seriously" copy in our privacy policy and what the site actually does when you visit it. On an SRA-regulated firm's website that mismatch is complaint-worthy under SRA Principles 2 and 5.
>
> **What I'm doing about it, and what I want from you.**
>
> Good news on the fix: the site-side of Google Consent Mode v2 is **already in place** in our code — checked today, `dataLayer` defaults are set to `denied` before GTM loads, and the banner already pushes `cookie_consent_granted` / `cookie_consent_denied` events on user action. So the site is signalling consent correctly. The problem is that the tags inside our GTM container weren't set to LISTEN to those signals — they fire regardless. That's a 20-minute click-through in the GTM UI, no code change on the site.
>
> Plan: delete the duplicate PostHog GTM tag, gate the consent-required tags (Meta Pixel, TikTok Pixel, Microsoft Clarity) on the existing `cookie_consent_granted` event, keep the ad conversion tags running (Google Ads, Bing UET) but with Consent Mode v2's cookieless/modelled mode — ICO-compatible, no lost attribution. Also swap Microsoft Clarity to a masked-input configuration matching the one we already use for PostHog.
>
> Full click-by-click playbook is in the attached document (`docs/gtm-consent-audit-2026-08-13.md`) if you want to see it. I can execute it if you send me the GTM login, or hand to a contractor.
>
> **From you I'd like:**
>
> 1. **Confirmation that TikTok Pixel should stay on the site at all.** I don't remember commissioning a TikTok Ads campaign — is that a live spend, dormant, or should it be removed entirely?
> 2. **A view on updating the privacy policy** to match the tightened behaviour (I'll draft the paragraph — a five-minute review from you before it goes live). Current policy is honest about the intent but the implementation had drifted, so we're now aligning implementation to policy rather than the other way around.
> 3. **A note on whether we need to log this as a formal breach.** My read: no. The trackers are all industry-standard, none of them handle special-category data, session-replay inputs are masked at the DOM level, and the fix window is measured in days not months. But you're the SRA-regulated principal — call is yours.
>
> No client action needed on your side beyond items (1)–(3). Aim to have the technical fix live within 5 working days; happy to talk it through on a call if easier than email.
>
> Best,
> Mohammed
>
> —
> Attached: `docs/gtm-consent-audit-2026-08-13.md` — full click-by-click GTM audit + fix playbook.

---

## After Imran replies

- **If he says "no formal breach, proceed":** ship the technical fix + update the privacy policy paragraph, log in his file
- **If he says "log a breach":** stop, follow the firm's breach-log procedure first, then ship
- **If he says "kill TikTok":** add tag deletion to the GTM playbook, remove any TikTok-related events from `src/lib/tracking.ts`

## Related deliverables (for your own reference)

- `docs/gtm-consent-audit-2026-08-13.md` — the click-by-click GTM playbook (attach to email or hand to your contractor)
- Site-side Consent Mode v2 dataLayer wiring — ships as its own PR from me (references this audit in the commit message)
- PR #10 — the earlier React-side PostHog lazy-load fix (already merged, still a valid separate improvement)
