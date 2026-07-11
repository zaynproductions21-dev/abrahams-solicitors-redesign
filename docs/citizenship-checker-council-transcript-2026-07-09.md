# LLM Council Transcript — British Citizenship Registration Entitlement Checker

**Client:** Abrahams Solicitors
**Subject reviewed:** `docs/citizenship-checker-spec-v0.1.md` (draft wizard build spec)
**Date:** 2026-07-09
**Advisors:** 5 generalists (Contrarian, First Principles, Expansionist, Outsider, Executor) + SEO Strategist

---

## Round 1 — Independent responses

### Contrarian
**Verdict:** APPROVE WITH CHANGES
**Position:** The concept is defensible and commercially sensible, but the spec under-mitigates YMYL/SRA exposure and misroutes at least one nationality edge case that is not academic.
**Reasoning:**
- The Q1 UK-birth branch is dangerously simplistic. A UK-born adult with no British/settled parent may be automatically British at birth via s.1(3) (parent later settled/naturalised before child turned 18) or entitled under s.1(4) (10-year residence rule) — neither is captured.
- "Our tool suggests X" is NOT a legal shield when the tool is on an SRA-regulated firm's site. Under SRA Principles 2 & 7 and Code para 8.6, published information must be accurate and not misleading; a wrong s.4B vs s.3(1) suggestion to a minor is a complaint-worthy event even with disclaimer wording.
- The Windrush/s.4L framing is the highest reputational trap. Misrouting a genuine Windrush victim into a "book a call" paywall funnel — or into wrong statute — is a Guardian-headline risk.
- Cannibalisation risk against existing wizard is real; "differentiated title tags" is not mitigation, it's hope.
- No versioning/change-control process for statute drift; annual flag is too slack.
- No GDPR/data-capture story for the "book a call" CTA.

**Biggest risk:** Misrouting a Windrush-generation user or an s.1(3)/s.1(4)-entitled UK-born adult on an SRA-regulated firm's site.
**Recommended changes:**
1. Add two questions covering parents' current UK immigration status/ILR and UK residence since birth.
2. Replace "tool suggests X" wording with hard-coded top-of-results banner: "This is general information, not legal advice. No solicitor-client relationship is created until we accept your instructions in writing."
3. Windrush/s.4L-specific triage skips CTA funnel + routes to named-solicitor callback; quarterly statute-review cadence owned by Imran Shah.

### First Principles Thinker
**Verdict:** APPROVE WITH CHANGES
**Position:** Problem framing is sharp but the solution over-engineers a new artefact when the existing /citizenship-wizard/ can absorb this with a routing extension.
**Reasoning:**
- The load-bearing unstated assumption is that a NEW wizard is required. It isn't. The real insight ("gov.uk omits registration routes") is a content/logic gap that can be patched into the existing wizard as a pre-flight branch. Two wizards competing for "British citizenship" intent is a self-inflicted SEO wound the spec already flags.
- Six questions with "not sure" escape hatches on statute-level nationality law is a wizard cosplaying as legal advice. For s.4L / Windrush / stateless-child routes, the honest answer is "book a call".
- Bottleneck for a £150/day immigration campaign is lead QUALITY, not volume.
- Entry-point framing ("you asked gov.uk") is clever but unverifiable.

**Biggest risk:** Two overlapping wizards on the same domain competing for citizenship intent, splitting link equity and confusing users.
**Recommended changes:**
1. Extend /citizenship-wizard/ with a Q0 branch — do NOT ship a second wizard URL.
2. Cut the 6-question flow to 3 — every "not sure" collapses to a solicitor-triage form.
3. Replace wizard verdicts for s.4L / s.3(1) / stateless-child with plain-English explainer page + booking CTA.

### Expansionist
**Verdict:** APPROVE WITH CHANGES
**Position:** Ship it, but treat this wizard as the front door of a much bigger Nationality-as-a-Service business unit, not a one-off SEO lead-gen tool.
**Reasoning:**
- Massive latent TAM: 500k+ Windrush-adjacent, Commonwealth-descent, BOTC, and stateless-in-UK cases sit outside gov.uk's flow.
- Each of the 8 routes is its own keyword cluster deserving a dedicated pillar page + downloadable PDF checklist (email-gated).
- Backlink goldmine untouched: Windrush Justice Clinic, JCWI, Praxis, Coram, university international student offices, Commonwealth High Commissions.
- Monetisation stack is thin: only "book a free call." Missing tiers — £29 letter, £149 review, £499 form-prep, £1,500 full application.
- Partnership plays: white-label the wizard for Citizens Advice, universities, immigration charities.
- Nurture missing: wizard completions without booking should enter a 5-email sequence per route type.

**Biggest risk:** Building it as a standalone SEO widget and never wiring the checklist downloads, email nurture, and paid-tier ladder — leaving 80% of the upside on the table.
**Recommended changes:**
1. Every route result includes route-specific downloadable PDF checklist gated by email capture + tagged nurture sequence.
2. Spin each of the 8 route outputs into its own indexable pillar page.
3. Add success metric: ≥3 editorial backlinks from Windrush/university sites within 90 days; paid tier CTA ladder alongside free call.

### Outsider
**Verdict:** APPROVE WITH CHANGES
**Position:** Wizard is genuinely helpful and answers a real gap, but the spec leaks legal jargon into user-facing surfaces and treats the final CTA as a default rather than something earned.
**Reasoning:**
- As a scared-hopeful user Googling "am I British through my grandad," I don't know what BOTC, s.4A, or "consular registration" mean — statute names as route titles will feel like more paperwork, not an answer.
- The 6 questions themselves read cleanly in plain English.
- "Not sure" appears on 4 of 6 questions and dumps everyone into "book a call" — manipulative escape hatch.
- Tone is missing — spec talks about legal accuracy but says nothing about acknowledging this is emotional (family, identity, belonging).
- The "book a call" CTA on every route (including "already British") is unearned.
- No trust cues in the flow beyond an SRA badge — no "we've done 400 of these", no named-solicitor face.

**Biggest risk:** A layperson hits a results page titled "s.4B registration route" and bounces because it reads like more homework, not an answer.
**Recommended changes:**
1. Rewrite every route title in human language first, statute second.
2. Replace blanket "Book free 30-min call" with route-appropriate CTAs.
3. Add one-line emotional opener + cap "not sure" branching (≥2 "not sure"s → soft explainer, not immediate sales handoff).

### Executor
**Verdict:** APPROVE WITH CHANGES
**Position:** Ship v0.1 this week — the spec is legally sound, wizard pattern already built, and 4hr build + 2hr solicitor review is realistic if we lock scope before a single line of code.
**Reasoning:**
- Config-driven wizard pattern already exists — this is a copy-config-edit-routing job.
- The 9-route decision matrix is the hard part; sign-off before coding = mechanical build; code-first = double rebuild.
- Solicitor review capacity IS the bottleneck, not build time — book Imran's 2hr slot NOW so it's queued.
- No external legal review needed beyond Imran.
- Cannibalisation risk with existing wizard is real but v2 problem — differentiated titles + cross-link on ship, monitor GSC for 30 days.

**Biggest risk:** Imran reviews the routing logic AFTER we've hand-coded it, finds a misrouted edge case, and we rebuild the routing table — 4hr becomes 10hr.
**Recommended changes:**
1. Add explicit "Routing Decision Matrix" appendix (truth table Q1-Q6 → route), signed off by Imran BEFORE coding starts.
2. Defer s.4L unfairness discretion and s.3(1) minor HS discretion to v2 — keep as "complex case — solicitor consultation" in v1 to shrink from 9 routes to 6.
3. Add hard "annual review" date field in wizard config header, not a comment.

**3-step action plan:**
1. TODAY: Send spec + routing matrix to Imran; book 2hr review slot 48hrs out.
2. ON SIGN-OFF: Fork ilr-wizard config → citizenship-registration-wizard; implement 6 questions + 6-route logic; wire SEO metadata in same PR.
3. SHIP: Solicitor walkthrough on preview → merge → deploy → GSC submit → 30-day review; annual review flag for July 2027.

### SEO Strategist
**Verdict:** APPROVE WITH CHANGES
**Position:** Long-tail registration keyword set is genuinely winnable and differentiation from existing naturalisation wizard is sound, but the spec ships without the E-E-A-T, schema, and passage-extraction scaffolding that YMYL legal content requires.
**Reasoning:**
- Keyword opportunity is real: gov.uk owns "am I British" head terms but has zero content on s.4A/s.4B/s.4D/s.4L registration routes — solicitor-authored page with statute citations can rank in 8–14 weeks given Abrahams' existing topical authority.
- Cannibalisation manageable IF the new page is titled around "registration/entitlement" and the naturalisation wizard is titled around "naturalisation/ILR-to-citizenship" — spec doesn't lock this.
- Wizard JS is a citability risk: AI Overviews and ChatGPT/Perplexity extract from static passage-level HTML — route outputs need to exist as crawlable content, not only as JS-rendered result states.
- Schema and author signals missing: no LegalService, no FAQPage, no HowTo, no Person schema for Imran with sameAs to SRA register.
- Backlink angle underexploited: Windrush advocacy orgs, Commonwealth student services, university international offices.
- Freshness signal missing: needs visible "Last reviewed by Imran Shah, SRA #509359 on [date]" byline on-page.

**Biggest risk:** Wizard's outputs render only as JS result states with no static passage-level HTML — page ranks weakly, gets zero AI Overview citations, gov.uk continues to own the answer surface.
**Recommended changes:**
1. Render each route explanation as static, crawlable HTML sections below the wizard (H2 per route with statute name, 150–250 words, FAQPage + HowTo schema).
2. Lock URL `/british-citizenship-registration-checker/`, H1 "British Citizenship Registration Entitlement Checker", title tag targets "registration"; cross-link both wizards.
3. Add author E-E-A-T block: visible "Reviewed by Imran Shah, Solicitor, SRA #509359" byline + dated stamp, Person schema with sameAs → SRA register, LegalService schema, References section.

---

## Round 2 — Peer Review

### Contrarian's review
- **Most agree with:** SEO Strategist — locks in E-E-A-T, schema, static passages and URL differentiation, which materially reduces the YMYL/SRA and cannibalisation risks I flagged.
- **Most disagree with:** Executor — "ship v0.1 this week" underweights the s.4L/Windrush and s.1(3)/s.1(4) misrouting exposure I called out; deferring to v2 is not enough.
- **Position changed:** NO. Core objection stands.

### First Principles' review
- **Most agree with:** SEO Strategist — YMYL-specific SEO scaffolding is the concrete execution layer that makes my "don't ship a second wizard" concern tractable if leadership overrules me.
- **Most disagree with:** Executor — treating this as a 4hr copy-config job before resolving the cannibalisation and s.4L legal-exposure questions is exactly how the routing table gets rebuilt twice.
- **Position changed:** NO.

### Expansionist's review
- **Most agree with:** SEO Strategist — locks the YMYL fix that turns the wizard into a citable, rank-worthy asset rather than a hidden JS widget.
- **Most disagree with:** Executor — "ship this week" underweights the s.1(3)/s.1(4)/Windrush misrouting risk; speed here is the actual liability.
- **Position changed:** NO.

### Outsider's review
- **Most agree with:** SEO Strategist — locks the two biggest silent killers (JS-only outputs killing citability, missing E-E-A-T/schema) that my UX critique doesn't cover but directly worsens the layperson experience I flagged.
- **Most disagree with:** Executor — "ship this week" treats solicitor sign-off as a scheduling problem and skips the human-language rewrite and CTA-earning work a scared user needs.
- **Position changed:** NO.

### Executor's review
- **Most agree with:** SEO Strategist — static passage-level HTML per route with schema and E-E-A-T byline is the single highest-leverage fix; without it the wizard ranks weakly and gov.uk keeps the answer surface.
- **Most disagree with:** First Principles — collapsing to 3 questions and dumping every "not sure" into a triage form abandons the actual differentiator (routing to registration statutes) and undersells a solvable UX problem.
- **Position changed:** **YES**. Still back shipping fast, but F and A convinced me the routing matrix sign-off must land alongside static route HTML + s.1(3)/s.1(4) coverage before v0.1.

### SEO Strategist's review
- **Most agree with:** (Self-review — SEO scaffolding is the only submission addressing YMYL crawlability, schema, and static passage-level HTML that determines whether the wizard actually captures the ranking opportunity.)
- **Most disagree with:** First Principles — collapsing to 3 questions and killing statute-level routing sacrifices the exact long-tail registration keyword differentiation (s.4A/s.4B/s.4L) that makes this page winnable.
- **Position changed:** NO.

---

## Chairman's Synthesis

### Council Verdict: **APPROVED WITH CHANGES**

### Consensus Points
- The gap in the market is real and the differentiation from the existing naturalisation wizard is genuine
- Static passage-level HTML for each route is required, not optional (F's core point earned universal peer agreement)
- Author E-E-A-T byline with SRA link + Person / LegalService / FAQPage schema are table-stakes for YMYL, not v2 nice-to-haves
- Route titles must be human-first, statute-second — no user should ever see "s.4B route" as an answer headline
- Cannibalisation risk requires locked URL / H1 / title-tag differentiation with the existing `/citizenship-wizard/`
- Solicitor sign-off on the routing decision matrix must come BEFORE code, not after

### Key Disagreements
- **Contrarian vs Executor on velocity:** A said ship-this-week underweights s.4L / s.1(3) / s.1(4) misrouting risk; E's peer review shifted to concede this. **Resolved in A's favour.**
- **First Principles vs the room on architecture:** B says extend the existing wizard rather than ship a second URL; every other advisor (including F's peer review) prefers a differentiated new URL provided SEO signals are locked. **Resolved against B — new URL, but with F's differentiation locks mandatory.**
- **Expansionist vs Executor on scope:** C wants email nurture + PDFs + pillar pages + paid tiers in v1; E wants v1-minimum + ship. **Resolved in E's favour — C's items deferred to v2, captured in the spec.**

### Blind Spots Identified
- s.1(3) / s.1(4) automatic-British-at-birth branches missing from question set
- GDPR consent basis on wizard-to-CTA data capture never addressed
- Person / LegalService / FAQPage / HowTo schema not specified
- Visible dated solicitor byline missing on-page
- Backlink outreach not listed as a shipping workstream
- Emotional register / opener acknowledging that nationality is personal
- CTAs unearned by route rather than blanket "book a call"

### Recommended Changes (v0.1 must-haves — building without these is REJECTED)
1. **Static route explainers below the wizard.** Each route rendered as a crawlable H2 section with statute name, 150-250 words, FAQPage + HowTo schema, so AI Overviews can extract passage-level answers.
2. **Author E-E-A-T + schema block.** Visible "Reviewed by Imran Shah, Solicitor, SRA #509359" byline with dated last-reviewed stamp; Person schema with sameAs → SRA register; LegalService schema; References section citing British Nationality Act 1981 + NABA 2022 + Home Office nationality policy.
3. **Route titles human-first, statute-second.** "You may be able to register as British because you were born here and lived here your whole life (legal basis: s.4B)".
4. **Add s.1(3) + s.1(4) coverage.** Two extra questions covering (a) parents' current UK immigration status and (b) UK residence since birth. Question count goes from 6 to 8.
5. **Cap "not sure" branching.** ≥2 "not sure"s → soft explainer rather than immediate CTA funnel.
6. **Lock URL + H1 + title-tag differentiation.** URL `/british-citizenship-registration-checker/`; H1 "British Citizenship Registration Entitlement Checker"; title tag targets "registration" NOT "naturalisation"; cross-link both wizards with descriptive anchor text.
7. **Route-appropriate CTAs.** "Already British" → first-passport guide, no call. Simple registrations (s.4A BOTC) → documents guide + call. Discretionary routes (s.4L / s.3(1)) → call + Windrush-specific triage that skips the standard CTA funnel and routes to a named solicitor callback.
8. **Routing decision matrix appendix signed off by Imran BEFORE code.** Explicit truth table Q1-Q8 → route.
9. **Hardcoded top-of-results legal disclaimer banner.** "This is general information, not legal advice. No solicitor-client relationship is created until we accept your instructions in writing." + SRA regulated-status statement.
10. **Quarterly statute review cadence** (not annual). Hard date in wizard config header, owned by Imran.

### Deferred to v2 (captured, not blocking)
- Email nurture sequence per route
- Paid tier CTA ladder (£29 letter / £149 review / £499 form-prep / £1500 full app)
- 8 dedicated indexable pillar pages per route
- Backlink outreach sprint (Windrush advocacy, Commonwealth associations, university student services)

### Final Action Plan
1. **THIS WEEK — DRAFT + SIGN-OFF.** Update spec to v0.2 with all 10 recommended changes above. Draft routing decision matrix (Q1-Q8 truth table → route). Send to Imran as a Phase-4-style redline email with tick-boxes. Book his 2hr review slot 48 hours out. No coding starts until the truth table is signed.
2. **ON SIGN-OFF — BUILD.** Fork `ilr-wizard-config.ts` → `citizenship-registration-checker-config.ts`. Implement 8 questions + 6-route decision logic per the signed matrix (defer s.4L unfairness discretion + s.3(1) minor HS discretion to consultation-only in v1). Write static passage-level HTML for each route with statute-named H2s. Wire Person + LegalService + FAQPage + HowTo schema. Add author byline block with SRA link + dated stamp. Add quarterly review date field in config header.
3. **SHIP.** Solicitor walkthrough on Vercel preview URL → merge to main → deploy to `/british-citizenship-registration-checker/`. Submit URL to Google Search Console for indexing. Add descriptive cross-links from `/citizenship-wizard/` and vice-versa. Set 30-day GSC + Ads landing-page CTR review. Quarterly review flag for October 2026.

### Risk Rating: **MEDIUM**

Biggest risk: **Misrouting a Windrush-generation user or an s.1(3)/s.1(4)-entitled UK-born adult on an SRA-regulated firm's site** — Guardian-headline reputational risk, not just technical. Mitigation is Change #4 (add s.1(3)/s.1(4) coverage) + Change #7 (Windrush-specific triage skipping standard CTA funnel) + Change #8 (Imran-signed routing matrix pre-code).
