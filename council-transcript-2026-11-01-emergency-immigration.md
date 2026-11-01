# LLM Council — Abrahams Emergency Immigration LP

**Date:** 2026-11-01
**Subject:** Rework `/emergency-immigration-solicitor/` into a situation router + 3 scenario sub-pages + server-side A/B test
**Client:** Abrahams Solicitors (`cl_mnxclw6q`, SRA #809071)
**Service area:** website

---

## Framed Question

Rework the Abrahams emergency-immigration landing page to lift form + call conversion at ≤£35 Google Ads CPA (currently £46), mobile-first (90%+). The page already converts ~27% of clicks — the job is squeezing a working page harder, not fixing something broken. Proposed architecture: main LP as a 3-tile situation router (visa expired / detention / removal-or-refusal notice + a "Something else" tile), three dedicated scenario sub-pages, server-side A/B test (new cookie `ab_emerg_hero`) mirroring the housing-disrepair hero pattern.

**Real CRM data (49 leads):** 17 "other" (35%), 11 unspecified (22%), 10 visa-expired (20%), 5 detention (10%), smaller buckets. Pipeline: 49 leads → 8 opportunities → 3 instructed/won (2 visa-expired, 1 detention).

---

## Advisor Responses

### 1. Contrarian 🪓

**VERDICT: APPROVE WITH CHANGES**

The 35% "other" + 22% blank is being read as "taxonomy is wrong." It might instead mean mobile users mash the first/default option to get past a dropdown — or that the real segment is "scared, doesn't know the legal label." Three shiny new tiles won't fix that; they'll just move the mush. Catastrophic risk: you're rebuilding the funnel on n=49 with 3 wins. That's not a dataset, it's an anecdote. A/B testing on 116 PostHog visitors (really ~580 true) over 10 months means the experiment won't reach significance before the 5 Oct 2026 Google policy deadline — and if the new hero underperforms, you've torched a page already converting 27%.

Hidden assumption: that `/emergency-immigration-solicitor/` is the right URL to fragment. Splitting equity across 3 thin sub-pages risks cannibalising the parent's rankings and triggers the gov-docs policy review again on each new URL.

**Answers:** (1) Ship `/immigration-detention/` FIRST — highest intent, time-critical, lowest copy-risk, and the one win proves demand. (2) "Something else" is a SAFETY NET only if it's a form, not a tile that opens a form — one tap, not two. (3) Kill any "urgent" / "act now" language paired with outcome verbs ("stop removal", "get released") — that's the exact SRA + gov-docs combo that got the main campaign disapproved.

---

### 2. First Principles 🧱

**VERDICT: APPROVE WITH CHANGES — but ship the taxonomy fix FIRST and treat the router/sub-pages as Phase 2.**

A page at 27% CVR with 8.75% CTR is not broken. It's a winner. The 45% engagement drop is a signal, not a mandate to rebuild. Rebuilding a winner is the single highest-risk move in CRO.

The real problem the CRM data screams: 57% of leads (35% "other" + 22% blank) couldn't classify themselves. That's not a hero problem, that's a form taxonomy problem. The dropdown is wrong, not the page. The 3 instructed clients came from the two biggest explicit buckets (visa-expired, detention) — exactly the two sub-pages proposed — but you'd learn that from the dropdown alone.

Simpler intervention that likely gets the same lift: rewrite the situation dropdown with the 3 router categories + a free-text "describe your situation" field. Ship this week. If "other" drops below 15%, your taxonomy hypothesis is confirmed and sub-pages become justified. If it doesn't, sub-pages won't help either.

(1) Build `/immigration-detention/` first — highest intent, time-critical, lowest competition, 1 of 3 wins came from here. (2) "Something else" is a LEAK on a router — it recreates the 35% "other" problem visually. Replace with "Not sure? Call now" tap-to-call. (3) Copy risk: "emergency" + "urgent" everywhere trips Google's gov-docs/sensitive-events sensitivity and SRA outcome-implication rules. Use "same-day immigration advice" instead.

---

### 3. Expansionist 🚀

**VERDICT: APPROVE WITH CHANGES**

The router is fine, but you're building a landing page when the real play is an urgent-immigration intake system. 35% "other" + 22% unspecified = 57% of leads don't fit your tiles. That's not a routing problem, it's a channel problem — people in crisis at 11pm don't want a callback form.

Bigger play: WhatsApp Business as primary CTA alongside phone. Click-to-chat (`wa.me` link) with pre-filled "I need urgent help" message, auto-reply within 60s, triage bot asks 3 questions, routes to on-call solicitor. Mobile 90% + 27% CVR says users are ready — remove the phone-call barrier. This alone could 2x conversion.

Adjacent compounders: (1) `/on-call-tonight/` page naming the duty solicitor with photo + SRA number, kills "is this a call centre?" doubt; (2) detention-centre-specific pages (`/brook-house-urgent/`, `/colnbrook-urgent/`) — families Google the centre name, not "detention solicitor"; (3) Punjabi/Urdu/Arabic WhatsApp community outreach to mosque/gurdwara admin groups — your 3 wins skew South Asian, lean in.

Sub-page order: detention first. Smallest volume (10%) but highest desperation, lowest competition, and families pay fast. Visa-expired is bigger but slower-converting.

"Something else" = safety net. 35% "other" won us leads. Keep it, but route to WhatsApp not a form.

Copy risk: "urgent" + "24/7" without a named rota = SRA misleading-advertising exposure. Name the solicitor or say "duty line, response within X minutes."

---

### 4. Outsider 👀

**VERDICT: APPROVE WITH CHANGES**

A panicked person at 2am isn't reading tiles — they're scanning for a phone number. The CRM proves it: 35% said "other", 22% didn't specify. They don't know the legal category of their own crisis. Fix before shipping:

1. **Phone number ABOVE the tiles, huge, sticky.** Not just tap-to-call inside tiles. The win is "I called in 4 seconds", not "I self-routed correctly".

2. **Rename every tile in plain panic-English:**
   - "Visa expired" → "My visa has run out" (also works for Urdu/Punjabi/Arabic speakers Google-translating; "expired" is DVLA/passport language, "overstayed" sounds like an accusation)
   - "Loved one in detention" → "Someone I know has been detained" (shorter, less legalistic)
   - "Removal or refusal notice" → **split these** — one tile "I've got a letter saying I have to leave" + drop "refusal" entirely from tile labels. "Removal directions" is Home Office jargon; nobody Googles it in panic.

3. **Build detention sub-page FIRST.** Highest urgency, clock is literally ticking, 1 of 3 wins came from this bucket, and it's where a wrong tile = wrong outcome.

4. **"Something else" is a safety net, not a leak** — 35% of your leads live there. Keep it, but relabel: "Not sure / something else happened". Pre-fill the form with "Tell us what's happened in your own words" — don't make them diagnose themselves.

5. **Copy risk**: "urgent callback form" assumes they trust a form over a phone at 2am. They don't. Form = fallback. Big number = hero.

---

### 5. Executor 🛠

**VERDICT: APPROVE WITH CHANGES**

The plan is sound but over-scoped for one dev in one week. CRM data says build sequentially, not simultaneously — visa-expired is the only sub-page with proven won revenue AND the largest named bucket (10 leads, 2 wins). Detention has 1 win off 5 leads but needs careful SRA copy. Removal directions has zero wins yet — defer. Three sub-pages + A/B harness + proxy cookie + PostHog flag + event schema in 5 days with Google Ads burning £300/day is how you ship nothing. Ship the router + one sub-page first, prove CPA moves, then add the rest.

Also: "Something else" at 17/49 (35%) is the single biggest bucket. That's not a safety net, that's your actual primary intent — the tiles are mislabelled against real demand. Keep it, but reframe as "Not sure / speak to someone" with a direct call CTA, not a form.

Copy risk: "emergency" + "urgent" on an immigration page risks implying guaranteed outcomes / regulated-advice-under-duress. SRA Principle 7 + Code 8.6. Every H1/CTA must be bounded to the service act ("Speak to a solicitor today"), never the result.

**3-STEP PLAN**

**Day 1 ship (minimum CPA-mover):**
- Router tiles on existing `/emergency-immigration-solicitor/` — pure copy + layout change, no new routes, no cookie, no flag. 4 tiles: visa expired / detained / notice received / not sure. Each tile = anchor to on-page section + sticky call CTA. Fire new `emergency_immigration_lead` PostHog event on form submit + tel: click.

**Day 3–5 ship:**
- Build `/visa-expired-urgent/` ONLY (highest-signal bucket, 2/3 wins). Mobile-first, bounded copy, SRA-compliant, same lead event with `source: visa-expired`. Add proxy.ts cookie `ab_emerg_hero` + PostHog flag mirroring housing-disrepair pattern — but A/B on the router page's HERO COPY ONLY (control vs. router), not sub-page existence.

**A/B measurement starts:** Day 5 publish → Day 6 ~2k mobile sessions bucketed → first read Day 12 (needs ~4k sessions / arm at 27% conv for 15% MDE on lead rate). Call it Day 14 regardless.

**Defer:** `/immigration-detention/` to week 2 (needs legal-aid signposting review), `/removal-directions-urgent/` to week 3 or kill — zero won revenue doesn't earn a page yet.

---

### 6. SEO Strategist 🔍

**VERDICT: APPROVE WITH CHANGES**

Cannibalisation: low risk IF the router LP retargets to the head term "emergency immigration solicitor UK" and each sub-page owns a distinct intent head ("overstayed visa UK solicitor", "immigration detention solicitor IRC", "removal directions solicitor section 10"). Router becomes the hub; sub-pages are spokes. Set `rel=canonical` to self on each; do NOT canonical sub-pages to router — that kills the GEO play.

**Indexable, not noindex.** Organic is the firm's main revenue line; a paid-only intake wastes the E-E-A-T spend. Each sub-page MUST ship: 150-word verbatim answer block directly under H1 (question-shaped H1, answer in first paragraph, no preamble — this is what AI Overviews lift), FAQPage + LegalService schema with Imran Shah as named author (`sameAs` mySRA profile), speakable CSS selectors on H1 + answer block, cite section 3C IA 1971 / Hardial Singh / Pre-Action Protocol inline with gov.uk links.

Linking: bidirectional mandatory. Sub-pages link back to router AND laterally to each other ("if detained after overstay, see…") — topical cluster signal.

Build detention FIRST — highest desperation, lowest competition, Hardial Singh gives genuine E-E-A-T moat.

"Something else" is a leak — replace with "Not sure? Call now" tap-to-call only, no form.

Copy risk: "urgent" + outcome verbs ("stop removal", "get released") breach SRA Code 8.1 and Google gov-docs policy — reframe as "challenge" / "representation".

---

### 7. Online Advertising Strategist 📊

**VERDICT: APPROVE WITH CHANGES**

**Tablet: exclude today via -100% bid adjustment.** £107 at 0/9 conv is a 95% confidence loss on a £35 tCPA — no learning value, pure drag on Smart Bidding's CPA signal. Reclaim ~£90-120/wk.

**Ad group split: YES, mandatory.** Three sub-pages = three ad groups with matching final URLs (visa-expired keywords → `/visa-expired-urgent/`, "detained"/"IRC" → `/immigration-detention/`, "removal directions"/"section 10" → `/removal-directions-urgent/`). Expected QS lift from 6→8 on message-match alone; projected CPA £46→£34-38. Current blended £46.71 is 33% over target precisely because 35% "other" leads mean 35% of clicks hit a mismatched page.

**Smart Bidding risk is REAL and underweighted.** Housing took 2-3 weeks; this is worse because you're (a) changing landing page structure, (b) adding a new conversion event, (c) splitting ad groups. Do NOT do all three simultaneously. Sequence: Week 1 ship router + import `emergency_immigration_lead` as a Google Ads conversion (via GTM/enhanced conversions — without import, Smart Bidding is blind and tCPA will drift up 20-40% during the gap). Week 2-3 split ad groups once new event has ≥30 conv. A/B test LAST.

**First sub-page: `visa-expired-urgent`** — highest CRM volume (10/49), fastest to 30-conv threshold, lowest compliance landmine (vs detention/removal where YMYL copy risk is severe).

"Something else": safety net IF it routes to a triage form with practice-area dropdown feeding CRM categorisation. Currently a leak — 35% "other" proves it. Make the tile a qualifier, not an escape hatch.

Copy risk: "urgent" + "emergency" + visa language will re-trigger the government-docs disapproval. Frame as "urgent legal advice for people facing [situation]" — never "we handle your visa expiry" or "fix your immigration status". Legal services, not document acquisition.

---

## Chairman's Synthesis (compressed peer review)

### Consensus (7 of 7 advisors)
- **APPROVE WITH CHANGES.** The architecture is directionally right but under-scoped on taxonomy, over-scoped on simultaneous shipping, and under-defended on copy compliance.
- The current page's detention-first framing is misaligned with the actual demand (visa-expired is 2× bigger by volume AND by instructed cases).
- The 57% "other" + unspecified bucket is the biggest conversion ceiling on this page. Fix the taxonomy, not the hero.
- Universal copy risk: "urgent" + "emergency" + outcome verbs ("stop removal", "get released") breach SRA Code + Google government-docs policy. Reframe as bounded legal services and representation.
- Sub-pages indexable (not noindex) with LegalService + FAQPage schema, named author (Imran Shah), speakable targets, statute citations.
- Sequential ship, not parallel. Three simultaneous changes with £300/day Smart Bidding running = money fire.

### Key disagreement — resolved
**Which sub-page first?** 5 advisors say `/immigration-detention/` (highest desperation, lowest competition, strongest organic E-E-A-T via Hardial Singh). 2 advisors say `/visa-expired-urgent/` (fastest to Smart Bidding's 30-conv threshold, 2/3 of won cases, lowest YMYL compliance landmine). **Chairman call: ship /visa-expired-urgent/ FIRST.** The paid campaign is burning £300/day; the operational argument (fastest conversion signal, lowest compliance landmine) outweighs the strategic organic argument this week. Detention sub-page ships week 2 and owns the organic / SRA moat.

### Blind spots identified
1. **No WhatsApp intake channel.** Mobile-90% visitors in crisis prefer text over call. Reuse `+447476548311` setup from housing-disrepair.
2. **Tablet is burning £107/mo at 0 conv** — exclude via -100% bid immediately.
3. **No plan to import `emergency_immigration_lead` as a Google Ads conversion action** — Smart Bidding will be blind for 2–4 weeks without this. Highest-risk gap.
4. **No named duty solicitor.** "24/7" without naming the rota implies regulated availability the firm may not operationally meet (SRA Principle 7).
5. **No panic-English translation of labels.** "Removal directions" / "refusal notice" are Home Office jargon no one Googles in a crisis.
6. **n=49 is small.** Statistical significance on a 3-arm A/B needs 2–4 weeks even with £300/day traffic. Set expectations.

---

## Chairman Verdict

**APPROVED WITH CHANGES.** Ship sequentially, fix the taxonomy before the router rebuild, and respect the Smart Bidding re-converge window.

### Recommended changes

1. **Ship /visa-expired-urgent/ FIRST** (not detention). Fastest conversion-signal to the Google Ads conversion action; 2/3 of won cases came from this bucket; lowest YMYL compliance landmine.
2. **Fix taxonomy before router.** Day 1: ship PostHog `emergency_immigration_lead` event + rewrite situation dropdown + sticky huge phone number ABOVE the tiles. Day 3–5: ship `/visa-expired-urgent/`. Week 2: `/immigration-detention/` once the new event has ≥30 conv.
3. **Kill the "Something else" tile as currently proposed.** Replace with: "Not sure? → Call now" (primary tap-to-call CTA) + a free-text triage form that pre-fills "Tell us what's happened in your own words."
4. **Translate every tile label into panic-English.** "Visa expired" → "My visa has run out". "Loved one in detention" → "Someone I know has been detained". "Removal or refusal notice" → split: "I've got a letter saying I have to leave" (drop "refusal" from the tile).
5. **Copy guardrails:** no "urgent" + outcome verbs. Replace with "same-day legal advice" + "representation" + bounded service claims. Name the duty solicitor with photo + SRA link. SRA badge in header. No "we obtain your visa" anywhere.
6. **Sub-pages indexable, with GEO/AI-citation structure.** 150-word verbatim-liftable answer block under H1; FAQPage + LegalService schema with Imran Shah as named author; speakable CSS selectors; statute citations (section 3C IA 1971; Hardial Singh; Pre-Action Protocol).
7. **Operational hygiene before architecture.** Exclude tablet (-100% bid) today. Import `emergency_immigration_lead` as a Google Ads conversion action BEFORE splitting ad groups. Add WhatsApp Business as a secondary CTA alongside phone.

### Final action plan

**Week 1 — Day 1 (ship within 48h):**
1. Add PostHog `emergency_immigration_lead` event on form submit + tap-to-call.
2. Add sticky huge phone number above the hero.
3. Rewrite situation dropdown with new taxonomy + free-text "describe your situation".
4. Add tablet -100% bid adjustment in Google Ads.
5. Import new PostHog event as Google Ads conversion action.

**Week 1 — Day 3–5:**
6. Build `/visa-expired-urgent/` (indexable, FAQPage + LegalService schema, Imran Shah as named author, 150-word verbatim answer block, section 3C IA 1971 citation inline).
7. Rework main LP as a 3-tile situation router (visa-expired / detention / letter-to-leave) + "Not sure? Call now" primary tap-to-call + free-text triage fallback.
8. Launch server-side A/B test via proxy.ts `ab_emerg_hero` cookie + PostHog flag + experiment, mirroring housing-disrepair pattern. Measurement starts Day 6; first read Day 12–14.

**Week 2:**
9. Build `/immigration-detention/` with Hardial Singh depth + detention-centre-specific routing (`/brook-house-urgent/`, `/colnbrook-urgent/` can be stubs for now, redirect to detention page).
10. Review A/B interim data; swap control if clear signal.

**Week 3+:**
11. Consider `/removal-directions-urgent/` only if the taxonomy fix shows ≥10% of leads come from this bucket.
12. Evaluate WhatsApp intake as paid-media channel.

### Risk Rating: MEDIUM
Biggest risk: Smart Bidding's reconverge window during landing-page changes could spike CPA 20–40% for 2–3 weeks before settling at a lower baseline. Mitigate by (a) sequencing changes rather than shipping in parallel, (b) importing the new conversion event into Google Ads BEFORE any URL split, and (c) holding bids steady during learning phase.
