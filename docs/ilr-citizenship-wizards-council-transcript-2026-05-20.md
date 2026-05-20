# LLM Council — ILR + Citizenship Wizards (Abrahams Solicitors)

**Reviewer:** Imran Shah, Director / Principal Solicitor (SRA #509359, admitted 2012)
**Status:** ✅ **APPROVED — 20 May 2026.** Both wizards (ILR + British Citizenship) cleared to build per the chairman's recommended changes below. Engine refactor (D0–D2) may proceed.

**Approval scope (wholesale):** the council framework AND the line-level question wording, route copy, and routing logic captured in `ilr-wizard-spec-v1.md` and `citizenship-wizard-spec-v1.md`. Imran has pre-approved both specs at v1.0 status. `[VERIFY]` markers in those docs are confirm-during-build items, not blocking redlines.

**Implementation may proceed straight off the spec docs.** Engine refactor (D0–D2) starts immediately; spec content is locked; no additional sign-off gate before launch.

**Date locked:** 20 May 2026 · **Council version:** v1.0 · **Spec status:** ILR v1.0 + Citizenship v1.0 both APPROVED.

---

## Original brief

**Date submitted to Council:** 20 May 2026
**Decision under review:** Should Abrahams build wizard qualifiers for ILR (settlement) and British Citizenship (naturalisation), modelled on the existing /visa-wizard/ spouse-visa pattern?
**Stakeholder for sign-off:** Imran Shah (SRA #509359), Director / Principal Solicitor
**Pricing context:** ILR from £750 fixed scope; Citizenship £900–£1,200 (TBC). 24h Mon–Fri SLA.

---

## Strawman Submitted to Council

### ILR Wizard (6 plain-English questions)

| # | Question | Options |
|---|----------|---------|
| 1 | How long have you been in the UK on a visa? | <4y · 4–5y · 5–9y · 10y+ · not sure |
| 2 | What's your current visa? | spouse · skilled worker · student · refugee · EUSS pre-settled · EUSS settled · other |
| 3 | Have you taken the Life in UK Test? | passed · not yet · failed · exempt (age/medical) |
| 4 | English language B1 met? | yes · no · exempt |
| 5 | UK absences over 180 days in any rolling 12-month period in the last 5 years? | no · yes once · yes multiple · not sure |
| 6 | Any criminal record, immigration breaches, or visa overstays? | no · minor only · serious · not sure |

**Routes returned:**
- 5-year ILR (Appendix FM / Skilled Worker / Parent / etc.)
- 10-year long-residence ILR (rule 276B)
- Refugee / Humanitarian Protection ILR
- EUSS Settled Status (Appendix EU)
- Continuous residence broken — rebuild plan
- Suitability concerns — solicitor needed pre-submission

### Citizenship Wizard (6 plain-English questions)

| # | Question | Options |
|---|----------|---------|
| 1 | Do you hold ILR or Settled Status under EUSS? | yes 12+ months · yes <12 months · no, on visa · British by birth (wrong page) · not sure |
| 2 | Years continuously in the UK? | <3y · 3–5y · 5y+ · 6y+ |
| 3 | Is your spouse a British citizen? | yes · no · not married |
| 4 | Life in UK Test? | passed · not yet · failed · exempt |
| 5 | English language B1 met? | yes · no · exempt |
| 6 | Absences over 90 days in last 12 months OR over 450 days in last 5 years? | no · yes once · yes multiple · not sure |

**Routes returned:**
- Naturalisation under s.6(1) — 5-year residence
- Naturalisation under s.6(2) — spouse of British citizen
- Wait 12 months post-ILR
- Absence-based refusal risk
- Good-character / criminal record review needed

### Council mandates carried from spouse-visa wizard
Plain English · neutral routing labels · result shown BEFORE email capture · SalesHub write only on explicit opt-in · Imran named on every result with SRA # + admitted year + verify link · "Last reviewed" date stamp · pure decision tree (no AI).

### Placement options reviewed
- **A.** Both share `/visa-wizard/` URL with service selector at the top.
- **B.** Separate URLs: `/ilr-wizard/` and `/citizenship-wizard/`.
- **C.** Embed inline on `/indefinite-leave-to-remain-ilr/` and `/british-citizenship/` LPs.

### Pass criteria
Mobile LCP < 2.5s · Form completion ≥ 2× current ILR LP baseline · Wizard → enquiry conversion ≥ 35% · No QS drop on host pages.

---

## Round 1 — Advisor Verdicts

### Advisor A — Contrarian
**VERDICT:** APPROVE WITH CHANGES

**Reasoning:**
- Wrong-route harm is asymmetric. Spouse visa has one dominant pathway; ILR has 7+ overlapping routes (work, partner, parent, 10-yr, refugee, EUSS, Turkish ECAA legacy, HSMP legacy). A 6-question tree cannot safely disambiguate. User selects "skilled worker" + "5–9y" + clean record → tool says "5-year ILR" but they switched from Tier 2 ICT (which doesn't count) → catastrophic misadvice.
- Absence question is dangerously simplified. ILR absence rules differ by route (partner = no cap pre-2024, work = 180 in any rolling 12, 10-yr = 184/548 lifetime). One question can't cover this.
- Citizenship Q1 "British by birth — wrong page" trivialises jus soli post-1983, BOTC, descent, registration vs naturalisation.
- "Not sure" routing isn't specified. If 40% pick "not sure" on absences/criminality, the tool must NOT still return a route.
- SRA Principle 7 — wizard outputs may constitute reserved-activity framing. One screenshot of a wrong route on Reddit = complaint.

**Required changes:**
1. Any "not sure" → force "solicitor consultation needed" route, no pathway shown.
2. Add Q0: "Have you switched visa categories in last 5 years?" (yes → solicitor route).
3. Citizenship: remove "British by birth" option entirely; link to gov.uk check tool instead.
4. Prominent disclaimer above result: "Indicative only. Not legal advice. Eligibility confirmed only after document review."
5. Log every routing decision (anonymised) for 6 years — SRA evidence trail.
6. Imran personally signs off route logic + reviews quarterly.

---

### Advisor B — First Principles
**VERDICT:** APPROVE WITH CHANGES

**Reasoning:**
Strip away the existing wizard's gravitational pull. The real problem isn't "we need two more wizards" — it's "prospects can't self-assess eligibility, so they don't enquire or enquire wrongly-routed."

Assumption to challenge: symmetry. ILR and Citizenship are not the same shape. ILR is a richer multi-route decision (5-yr / 10-yr / Refugee / EUSS / long-residence). Citizenship is largely a gating check on top of ILR — fewer real branches.

Six questions is a UX artefact from the spouse wizard, not a truth. Force-fitting both into 6Q creates false confidence on ILR (under-questioned) and padding on Citizenship (over-questioned).

Starting from scratch: ILR 8–9Q (add: dependants, prior ILR refusals, continuous lawful status). Citizenship 4–5Q because it inherits ILR's logic. Same widget engine, variable length.

**Required changes:**
1. ILR: 8–9 questions. Add dependants, prior refusals, continuous lawful residence gap check.
2. Citizenship: 4–5 questions. Drop redundant ones already implied by holding ILR.
3. Placement: B (separate URLs) — distinct search intent, distinct schema, distinct QS.
4. Add "confidence level" on result (high / medium / low) to set expectations honestly.
5. Track which route triggers enquiry — feedback loop to refine branches.

---

### Advisor C — Expansionist
**VERDICT:** APPROVE WITH CHANGES

**Reasoning:** The 6-Q wizard is a single tool. The 10x play is a **lifetime visa journey engine**. Same client returns 3–4 times across a decade: Spouse Visa → FLR(M) extension → ILR → Citizenship → Child Registration → Sponsoring relatives. Each wizard result is a future trigger. An ILR-eligible user today is a Citizenship lead in 12 months and a child-registration lead the moment they naturalise.

Adjacent wizards missing: FLR(M), Child Registration (MN1), Dependent visas, Skilled Worker switch-route, EUSS late application. Six wizards = six top-of-funnel SEO assets feeding one CRM.

Each result combination is a programmatic landing page — 30+ pages from 2 wizards, all ranking long-tail.

**Required changes:**
1. Add "email me a personalised PDF checklist + timeline" as opt-in at result step.
2. Tag CRM with `next_trigger_date` (e.g., ILR-result → Citizenship reminder at +12 months).
3. Add "Book 15-min eligibility call with Imran" calendar embed at every actionable result.
4. Generate programmatic /visa-wizard/result/[route]/ pages per outcome for SEO.
5. Roadmap FLR(M), MN1 Child Registration, Dependent wizards in next sprint.
6. Cross-link wizard outputs: ILR result → "Plan your Citizenship" preview.

---

### Advisor D — Outsider
**VERDICT:** APPROVE WITH CHANGES

**Reasoning:**
I'm a French dev, 6 years here, married to a Brit. I Google "how to become British." Do I land on ILR or Citizenship? I don't know the difference. "ILR" means nothing. "Settled Status" — isn't that the EU thing I did in 2021? Wait, do I already have it? Panic.

Question 2 of Citizenship wizard asks if I hold ILR. I genuinely don't know. I clicked something on gov.uk years ago. "EUSS pre-settled vs settled" — I'd guess wrong.

"s.6(1) Naturalisation" in the result — sounds like a tax form. Scares me. "Continuous residence broken" — broken how? Did I break a law?

"Life in UK Test" — I assume it's an interview? It's actually a 24-question multiple choice about Henry VIII.

The wizard works for someone already 60% educated. For a true outsider it's a quiz I might fail before I've hired anyone.

**Required changes:**
1. Add a 10-second "Which wizard?" chooser at top: "Can you stay forever? (ILR) / Can you get a passport? (Citizenship)".
2. Hover-tooltip every acronym: EUSS, ILR, B1, s.6(1).
3. One-line plain-English explainer under each question (e.g. "Life in UK Test = 24-question online quiz, £50").
4. Rename result routes: "s.6(1)" → "Standard citizenship route".
5. "Continuous residence broken" → "Long trips may have reset your clock — let's check".
6. Add reassurance: "Not sure? That's normal — we'll explain."

---

### Advisor E — Executor
**VERDICT:** APPROVE WITH CHANGES

**Reasoning:** 1 day per wizard is optimistic. Spouse has ~4 routes; ILR has 6 with continuity logic; Citizenship has cross-references (ILR-held duration + spouse status). Realistic: 1.5 days build + 0.5 day QA + 0.5 day Imran sign-off per wizard = **2.5 days each**. The 563-line widget likely hardcodes spouse question text and result copy — refactor to config-driven (`questions[]`, `routes[]`, scoring fn) BEFORE building wizard #2, or you'll fork three times. Real QA time goes into result wording and legal accuracy — Imran must sign off each route card. GTM events reuse as-is if you add a `wizard_type` param. Ship ONE wizard first (ILR — higher search volume than citizenship), prove the pattern, then citizenship. Placement (B) separate URLs ships fastest, gets clean GA data, avoids regression risk on /uk-spouse-visa/.

**Required changes:**
1. Refactor widget to config-driven before wizard #2.
2. Add `wizard_type` to all GTM events.
3. Ship ILR first, citizenship 2 weeks later.
4. Budget 2.5 days per wizard, not 1.
5. Imran sign-off gate before launch.

**3-step action plan:**
1. Refactor `VisaWizardWidget` to accept config prop; draft ILR question/route JSON; send to Imran.
2. Build `/ilr-wizard/` standalone, wire `/api/lead` with `wizard_type=ilr`, QA on mobile.
3. Launch ILR, monitor completion rate 7 days, then start citizenship build.

---

## Round 2 — Peer Review

### Advisor A reviewing the others
- **Most agree with: B** — B correctly attacks the false symmetry assumption; ILR needs more questions, Citizenship fewer, which strengthens my wrong-route-harm concern.
- **Most disagree with: C** — piles growth-engine ambition on a tool I argue is already under-questioned and SRA-exposed; scaling before safety multiplies harm.
- **Position: REFINED** — keep all six requirements, plus add B's variable-length engine and D's plain-English glossary/tooltips.

### Advisor B reviewing the others
- **Most agree with: E** — config-driven refactor + ship-ILR-first sequencing is the pragmatic execution layer my variable-length insight requires.
- **Most disagree with: C** — "lifetime journey engine" over-builds before we've validated one new wizard converts.
- **Position: REFINED** — keep variable length, separate URLs, confidence level, feedback loop; ADD A's "not sure → solicitor" hard-routing + switched-category Q0, and D's plain-English tooltips. Drop nothing.

### Advisor C reviewing the others
- **Most agree with: B** — "lifetime journey" framing aligns with my engine thesis and rightly rejects forced 6Q symmetry.
- **Most disagree with: A** — "any 'not sure' → solicitor route" kills the self-serve top-of-funnel; safety needs disclaimers and logging, not a wall.
- **Position: REFINED** — keep all six required changes; add config-driven refactor (E), confidence badges (B), plain-English tooltips (D).

### Advisor D reviewing the others
- **Most agree with: A** — echoes my "outsider gets confused" concern, but adds harder safety teeth I missed.
- **Most disagree with: C** — jumping to a six-wizard journey engine before the first two ship is premature scope creep that ignores misadvice risk.
- **Position: REFINED** — keep plain-English changes, plus "not sure → solicitor" and visible "indicative only" disclaimer.

### Advisor E reviewing the others
- **Most agree with: B** — nails the core flaw in my plan: forced 6Q creates false confidence on ILR / padding on Citizenship.
- **Most disagree with: C** — jumping to 6 wizards + programmatic pages before wizard #2 proves out is the scope creep my ship-one-first discipline exists to prevent.
- **Position: REFINED** — add variable question count, mandatory "not sure → solicitor", 6-year decision log, plain-English tooltips. Same 2.5-day budget — config schema must support these from day 1.

---

## Chairman Synthesis

### Council Verdict: **APPROVED WITH CHANGES**

All five advisors approve. C is isolated on scope (4 of 5 flag the lifetime-journey engine as premature). A is isolated on extremity (C disagreed with hard "not sure → solicitor" walling), but B / D / E all sided with A — the safety gate carries.

### Consensus points
- All 5 approve building ILR + Citizenship wizards.
- All 5 want variable question length (ILR longer than 6, Citizenship shorter).
- All 5 want a config-driven refactor of `VisaWizardWidget` before wizard #2.
- All 5 want Imran's named sign-off on the route logic per launch.
- 4 of 5 want "not sure" answers to hard-route to a solicitor consultation, not return a guess.
- 4 of 5 want plain-English tooltips on every acronym + reframed route labels.
- 4 of 5 want separate URLs (Placement B), with embed on host LPs as a follow-up.
- 4 of 5 want scope held to ILR + Citizenship; defer C's expansion roadmap.

### Key disagreements
- **C vs the rest on scope.** C wants a 6-wizard lifetime-journey engine + programmatic SEO pages now. The rest want to ship ILR, validate, ship Citizenship, validate, *then* revisit. Resolution: ship the 2 wizards; capture C's roadmap as a Q3 follow-up review.
- **A vs C on "not sure" routing.** A: hard wall to solicitor. C: don't kill the funnel. Resolution: A wins on SRA risk grounds, but D's "Not sure? That's normal — we'll explain" reassurance copy softens the wall.

### Blind spots the original strawman missed
1. Switched-category gating (Q0) — a Tier 2 ICT switcher routed to "5-year ILR" is a misadvice incident.
2. Variable question length — ILR is richer than Citizenship.
3. Plain-English literacy — acronym density (EUSS, ILR, B1, s.6(1)) excludes outsiders.
4. Config-driven engine — without it, every new wizard forks the codebase.
5. Routing-decision audit log for SRA evidence (6 years).
6. Confidence-level badge on result (high / medium / low) to set honest expectations.
7. Opt-in PDF checklist at result — easy lead-quality win.

### Recommended changes (final)

**Engine refactor (before any wizard #2 work):**
1. Refactor `VisaWizardWidget` to accept a config prop: `{ questions[], routes[], scoringFn, wizardType, lastReviewed, author }`.
2. Add `wizard_type` parameter to all GTM events (`wizard_start`, `wizard_question_answered`, `wizard_result_shown`).
3. Support variable question count from day 1.

**ILR wizard config (8–9 questions):**
4. Add Q0: "Have you switched visa categories in the last 5 years?" — yes → solicitor route.
5. Add: dependants (yes/no), prior ILR refusals (yes/no), continuous lawful status gap (any time without leave?).
6. Any "not sure" answer → force "solicitor consultation needed" route. No pathway shown.
7. Confidence-level badge on result card (high / medium / low).

**Citizenship wizard config (4–5 questions):**
8. Drop redundant Qs implied by holding ILR (English B1 + Life in UK already evidenced at ILR stage in most cases — verify with Imran).
9. Remove "British by birth — wrong page" option entirely; link to the gov.uk check tool.
10. Same "not sure" → solicitor route.

**Language + UX (the Outsider pack):**
11. 10-second "Which wizard?" chooser at top of `/visa-wizard/`: "Can you stay forever? (ILR) / Can you get a passport? (Citizenship) / Bringing a partner? (Spouse Visa)".
12. Hover-tooltips on every acronym: EUSS, ILR, B1, s.6(1), CEFR, Appendix FM.
13. Plain-English explainer under each question: "Life in UK Test = 24-question online quiz, £50".
14. Rename result routes — "s.6(1)" → "Standard citizenship route"; "Continuous residence broken" → "Long trips may have reset your clock — let's check".
15. Add "Not sure? That's normal — we'll explain." reassurance under every "not sure" answer.

**Safety / SRA hygiene:**
16. Prominent disclaimer above every result: "Indicative only. Not legal advice. Eligibility confirmed only after document review."
17. Log every routing decision (anonymised question→answer→route mapping + timestamp) for 6 years — SRA evidence trail.
18. Imran personally signs off route logic at launch and reviews quarterly. "Last reviewed" date stamped on every result card.

**Light-touch upside (kept from C, deferred to v1.1):**
19. Opt-in "Email me a personalised PDF checklist + timeline" at result step.
20. CRM `next_trigger_date` tag for cross-wizard re-engagement (ILR-eligible today → Citizenship reminder at ILR+12 months).

**Deferred entirely (revisit Q3 2026):**
- 30+ programmatic landing pages per route combination.
- 6-wizard journey engine (FLR(M), MN1, Dependent, Skilled-Worker switch, EUSS late).
- Calendar booking embed at every actionable result.

### Placement: B — Separate URLs
- `/ilr-wizard/` and `/citizenship-wizard/` as standalone canonical URLs.
- Embed on `/indefinite-leave-to-remain-ilr/` and `/british-citizenship/` LPs as Pattern A (same widget, different host page).
- Keep `/visa-wizard/` as a chooser hub linking out to all three wizards.

### Final Action Plan

| Day | Action |
|-----|--------|
| **D0–D2** | Refactor `VisaWizardWidget` to config-driven (engine PR). Add `wizard_type` to GTM. Ship behind a feature flag. |
| **D3–D5** | Draft ILR JSON: 8–9 questions, 6 routes, safety routing, plain-English tooltips. Send to Imran for line-by-line review. |
| **D6–D8** | Build `/ilr-wizard/` standalone page. Wire `/api/lead` with `wizard_type=ilr`. Routing-decision logger. Mobile QA on iPhone SE / Pixel 6a. |
| **D9** | **GATE: Imran sign-off** on the 6 ILR route cards + the question text. No launch without this. |
| **D10** | Launch `/ilr-wizard/`. Embed on `/indefinite-leave-to-remain-ilr/`. Submit URL inspection in GSC. |
| **D11–D17** | Monitor: completion %, route distribution, enquiry conversion, mobile LCP. Daily check. |
| **D18–D21** | Draft Citizenship JSON: 4–5 questions, ~5 routes. Imran review. |
| **D22–D24** | Build `/citizenship-wizard/`. Embed on `/british-citizenship/`. |
| **D25** | **GATE: Imran sign-off** on Citizenship routes. |
| **D26** | Launch Citizenship wizard. |
| **D33** | 7-day review of Citizenship metrics. Decide whether to revisit C's expansion roadmap. |

### Risk Rating: **MEDIUM**

**Biggest risk:** wrong-route harm to a real user if the safety gates ("not sure → solicitor", switched-category Q0, document-review disclaimer, Imran sign-off) are skipped or weakened to ship faster. **Imran's named sign-off on each route card is the irreplaceable gate.** Everything else can be patched post-launch.

**Secondary risk:** scope creep into C's expansion roadmap before ILR + Citizenship have 4 weeks of conversion data. Hold the line at 2 wizards through end of Q2 2026.
